import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './util'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))

          const sortedData = sortData(data)
          setTableData(sortedData)

          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  const onCountryChange = async e => {
    const countryCode = e.target.value

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title='Coronavirus Cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox
            title='Recovered'
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox
            title='Deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        {/* map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;

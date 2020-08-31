import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

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
          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  const onCountryChange = e => {
    const countryCode = e.target.value
    setCountry(countryCode)
  }

  return (
    <div className="App">
      {/* header */}
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

      {/* infoBox */}
      {/* infoBox */}
      {/* infoBox */}

      {/* table */}
      {/* graph */}

      {/* map */}

    </div>
  );
}

export default App;

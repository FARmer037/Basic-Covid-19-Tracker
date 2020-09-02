import React, { useEffect } from 'react'

const LineGraph = () => {
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
        })
    }, [])
    return (
        <div>
            I'm a graph
        </div>
    )
}

export default LineGraph

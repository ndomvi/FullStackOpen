import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchField = ({ searchQuery, handleSearchQueryChange }) => (
  <div>
    Find country: <input value={searchQuery} onChange={handleSearchQueryChange} />
  </div>
)

const CountryInfo = ({ country: { name, flag, capital, population, region, subregion } }) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={flag} alt={`Flag of ${name}`} style={{width: '35vh', height: '25vh'}}/>
      <h2>Basic info</h2>
      <h3>
        {region} - {subregion}
      </h3>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
    </div>
  )
}

const CountryData = ({ countryData, searchQuery }) => {
  const filteredCountryData = countryData.filter(country =>
    country.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  )

  if (filteredCountryData.length >= 15) {
    // Too many countries
    return (
      <div>
        <p>More than 15 countries found!</p>
        <p>Please type more letters to narrow down your search.</p>
      </div>
    )
  } else if (filteredCountryData.length > 1) {
    // 1-10 countries
    return (
      <div>
        {filteredCountryData.map(country => (
          <li key={country.alpha3Code}>{country.name}</li>
        ))}
      </div>
    )
  } else if (filteredCountryData.length === 1) {
    // 1 country, maximal verbosity
    return <CountryInfo country={filteredCountryData[0]} />
  } else {
    return <div>No countries found! Try changing your filter!</div>
  }
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countryData, setCountryData] = useState([])

  const getCountryData = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => setCountryData(response.data))
  }
  useEffect(getCountryData, [])

  const handleSearchQueryChange = e => setSearchQuery(e.target.value)

  return (
    <div>
      <h1>Country info</h1>
      <SearchField searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
      <h2>Result:</h2>
      <CountryData countryData={countryData} searchQuery={searchQuery} />
    </div>
  )
}

export default App

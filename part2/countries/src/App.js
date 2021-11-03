import { useEffect, useState } from "react";
import axios from "axios";

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return (
      <p>Too many results, specify another filter</p>
    )
  }
  else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country, index) => <li key={index}>{country.name.common}</li>)}
      </ul>
    )
  }
  else if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries} />
    )
  }
  else if (!filteredCountries.length) {
    return (
      <p>No results</p>
    )
  }
}

const Country = ({ country }) => {
  const currentCountry = country[0];
  return (
    <div>
      <h3>{currentCountry.name.common}</h3>
      <p>Capital: {currentCountry.capital[0]}</p>
      <p>Population: {currentCountry.population}</p>
      <h4>Languages</h4>
      <ul>
        {Object.entries(currentCountry.languages).map((language, index) => {
          return (<li key={index}>{language[1]}</li>)
        })}
      </ul>
      <img src={currentCountry.flags.png} alt={`flag of ${currentCountry.name.common}`} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countries = response.data;
        setCountries(countries);
      })
  }
  useEffect(hook, [])


  const filterChangeHandler = (event) => {
    setCountryFilter(event.target.value);
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));

  return (
    <div>
      Search Country
      <input value={countryFilter} onChange={filterChangeHandler} />
      <h3>COUNTRIES</h3>
      <Countries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App;

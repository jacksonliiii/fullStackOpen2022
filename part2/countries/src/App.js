import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <form>
      <div>Find Countries <input value={filter} onChange={handleFilterChange}/></div>
    </form>
  )
}

const Weather = ({country}) => {
  
  const api_key = process.env.REACT_APP_API_KEY

  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')

  const lat = country.latlng[0]
  const lon = country.latlng[1]

  axios
    .get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat 
    + '&lon=' + lon 
    + '&appid=' + api_key)
    .then(response => {
      setTemperature(response.data.main.temp)
      setWind(response.data.wind.speed)
      setIcon(response.data.weather[0].icon)
    })

  return (
    <div>
      <h2>Weather in {country.capital}</h2> 
      <p>Temperature: {temperature} Celsius</p>
      <img alt='Weather icon' src={'https://openweathermap.org/img/wn/' + icon + '@4x.png'}/>
      <p>Wind: {wind} m/s</p>
    </div>
  )
}

const CountryResult = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img alt="The respective country's flag" src={country.flags.png}/>
      <Weather country={country}/>
    </div>
  )
}

const Country = ({country, single}) => {

  const [visible, setVisible] = useState(false)
  const onClick = () => {
    console.log("Clicked!");
    setVisible(!visible)
  }

  if (single) {
    return (
      <CountryResult country={country}/>
    )
  } else {
    return (
      <div>
        <p>{country.name.common}</p>
        <input type="submit" value="Show" onClick={onClick}/>
        {visible ? <CountryResult country={country}/> : null}
      </div>
    )
  }
}

const Countries = ({countries, filter}) => {

  const filtered = countries.filter(country => country.name.common.includes(filter))

  if (filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filtered.length > 1) {
    return (
      <div>
        {filtered.map(country => <Country key={country.name.official} country={country} single={false}/>)}
      </div>
    )
  } else if (filtered.length === 1) {
    return (
      <div>
        <Country key={filtered[0].name.official} country={filtered[0]} single={true}/>
      </div>
    )
  } else {
    return (
      <p>No matches found</p>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  })

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Find Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App;

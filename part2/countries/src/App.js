import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <form>
      <div>Find Countries <input value={filter} onChange={handleFilterChange}/></div>
    </form>
  )
}

// const Weather = ({country}) => {
  
//   const weather_link = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid='
//   const api_key = process.env.REACT_APP_API_KEY

//   axios
//     .get(weather_link + api_key)
//     .then(response => {
//       console.log(response.data)
//     })

//   return (
//     <div></div>
//   )
// }

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
      {/* <Weather country={country}/> */}
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

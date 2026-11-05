import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const matches = countries.filter(c =>
    c.name.common.toLowerCase().includes(country.toLowerCase())
  )

  const showCountry = (name) => {
    setCountry(name)
  }

  return (
    <>
      <div>
        <p>find countries</p>
        <input type="text" value={country} onChange={(event) => setCountry(event.target.value)} />

        {matches.length > 10
          ? <p>Too many matches, specify another filter</p>
          : matches.length > 1 && matches.map(c => {
            return (
              <div key={c.cca3}>
                <p >{c.name.common}</p>
                <button onClick={() => showCountry(c.name.common)}>Show</button>
              </div>
            )
          })
        }

        {matches.length === 1 && (
          <div>
            <h2>{matches[0].name.common}</h2>
            <p>Capital {matches[0].capital}</p>
            <p>Area {matches[0].area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(matches[0].languages ?? {}).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={matches[0].flags.png} alt={matches[0].flags.alt} />
            {matches[0].capitalInfo?.latlng && (
              <Weather capital={matches[0].capital} latlng={matches[0].capitalInfo.latlng} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

const Weather = ({ capital, latlng }) => {
  const [weather, setWeather] = useState(null)
  const [lat, lon] = latlng

  useEffect(() => {
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms`)
      .then(response => setWeather(response.data.current))
  }, [lat, lon])

  if (!weather) return null

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {weather.temperature_2m} °C</p>
      <p>Wind {weather.wind_speed_10m} m/s</p>
    </div>
  )
}

export default App

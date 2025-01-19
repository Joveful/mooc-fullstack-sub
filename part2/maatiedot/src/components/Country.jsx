import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Country = ({countries, handleShow}) => {
  // More than 10 matches
  if (countries.length > 10) {
    return (
      <div>
        Too many matches
      </div>
    )
  }
  // Show info from one country
  if (countries.length === 1) {
    return (
      <div><ShowOneCountry countries={countries} /></div>
    )
  }
  // Filter matches no countries
  if (countries.length === 0) {
    return (
      <div>
        No matches
      </div>
    )
  }
  // Number of countries > 1 and <= 10
  return (
    countries.map((country) =>
      <div key={country.name.common}>
        {country.name.common} <button 
          type="submit" 
          value={country.name.common} 
          onClick={handleShow}>show</button>
      </div>
    )
  )
}

const ShowOneCountry = ({countries}) => {
  const languages = Object.values(countries[0].languages)
  const [weather, setWeather] = useState(null)

  // fetch weather data
  useEffect(() => {
    weatherService
      .getWeather(countries[0])
      .then(weatherResponse => {
        setWeather(weatherResponse)
      })
  },[])

  if (!weather) {
    return null
  }

  const weather_icon = weather.list[0].weather[0].icon
  const temp = Math.round((weather.list[0].main.temp - 273) * 10) / 10
  return (
    <div>
      <h1>{countries[0].name.common}</h1>
      capital: {countries[0].capital}<br/>
      area: {countries[0].area} km2
      <h3>languages:</h3>
      <ul>
        {languages.map((l) => 
          <li key={l}>{l}</li>
        )}
      </ul>
      <img src={countries[0].flags.png} />
      <h3>Weather in {countries[0].capital}</h3>
        temperature {temp} Celcius<br/>
        <img src={`https://openweathermap.org/img/wn/${weather_icon}@2x.png`} /><br/>
        wind {weather.list[0].wind.speed} m/s
    </div>
  )
}

export default Country

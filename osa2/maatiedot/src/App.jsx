import { useState, useEffect } from 'react'
import axios from 'axios'
import weatherService from './services/weather'
import Country from './components/Country'
import Filter from './components/Filter'


function App() {
  const [countries, setCountries] = useState([])
  //const [weather, setWeather] = useState(null)
  const [filterCountries, setFilterCountries] = useState('')

  useEffect(() => {
    weatherService
      .getCountries()
      .then(returnedCountry =>
        setCountries(returnedCountry)
      )
  }, [])

  const handleFilterCountriesChange = (event) => {
    setFilterCountries(event.target.value)
  }

  const countriesToShow = countries.filter(
    (country) => country.name.common.toLowerCase().includes(filterCountries.toLowerCase())
  )

  return (
    <div>
      <Filter filter={filterCountries} handle={handleFilterCountriesChange} />
      <Country countries={countriesToShow} handleShow={handleFilterCountriesChange} />
    </div>
  )
}

export default App

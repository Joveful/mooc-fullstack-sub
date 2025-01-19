import axios from "axios"
const apikey = import.meta.env.VITE_SOME_KEY

const getCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getWeather = country => {
    const latlong = country.latlng
    const request = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlong[0]}&lon=${latlong[1]}&appid=${apikey}`)
    return request.then(response => response.data)
}

export default { getCountries, getWeather }

import axios from "axios";

const getCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getWeather = country => {
    const latlong = country.latlng
    const apikey = '6f610a6b50e9ad391900ec7f4ad79e53'
    const request = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlong[0]}&lon=${latlong[1]}&appid=${apikey}`)
    return request.then(response => response.data)
}

export default { getCountries, getWeather }
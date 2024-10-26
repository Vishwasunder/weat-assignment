import {useState} from 'react'
import CurrentWeather from '../currentWeather'
import Forecastcard from '../forecastCard'

import './index.css'

const Home = () => {
  const [cityname, setCity] = useState('')
  const [currently, setCurrently] = useState({})
  const [forecat, setforecast] = useState([])

  const onSearchcity = event => {
    const city = event.target.value
    setCity(city)
  }
  const apikey = 'eb1e39d63a3d859e2bd202463170748d'

  const getdata = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`,
    )
    const data = await response.json()
    const citycords = data.filter(each => {
      if (each.country === 'IN') {
        return each
      }
    })
    const lat = citycords[0].lat
    const lon = citycords[0].lon

    const currweatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`,
    )
    const currweatherdata = await currweatherResponse.json()
    setCurrently(currweatherdata)

    // console.log(currweatherdata)

    const forecastresponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`,
    )
    const forecasstdata = await forecastresponse.json()
    setforecast(forecasstdata.list)

    // console.log(forecasstdata)

    // console.log(citycords)
    // console.log(data)
    // console.log(cityname)
  }

  return (
    <div className="container">
      <h1 className="heading">Weather Dashboard</h1>
      <div>
        <input
          type="text"
          placeHolder="Enter city name"
          onChange={onSearchcity}
          value={cityname}
          className="input"
        />
        <button className="btn" onClick={getdata}>
          search
        </button>
      </div>
      <div>
        <CurrentWeather currentWeatherReport={currently} />
      </div>
      <div>
        {forecat.map(each => (
          <Forecastcard key={each.dt} data={each} />
        ))}
      </div>
    </div>
  )
}

export default Home

// eb1e39d63a3d859e2bd202463170748d

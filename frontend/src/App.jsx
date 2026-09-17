
import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const searchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    setError('')
    setWeather(null)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/weather?city=${encodeURIComponent(city)}`
      )

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      setWeather(data)
    } catch (error) {
      setError('Unable to connect to the weather server')
    }
  }

  const getWeatherImage = (condition) => {
    const conditionText = condition.toLowerCase()

    if (conditionText.includes('rain')) {
      return '🌧️'
    }

    if (conditionText.includes('thunderstorm')) {
      return '⛈️'
    }

    if (conditionText.includes('snow')) {
      return '❄️'
    }

    if (
      conditionText.includes('cloud') ||
      conditionText.includes('overcast')
    ) {
      return '☁️'
    }

    if (
      conditionText.includes('mist') ||
      conditionText.includes('fog') ||
      conditionText.includes('haze')
    ) {
      return '🌫️'
    }

    return '☀️'
  }

  return (
    <div className="app">
      <div className="weather-container">

        <h1>🌤️ Weather Forecast</h1>

        <p className="subtitle">
          Check the current weather of any city
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchWeather()
              }
            }}
          />

          <button onClick={searchWeather}>
            Search
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">

            <h2>{weather.city}</h2>

            <div className="weather-icon">
              {getWeatherImage(weather.condition)}
            </div>

            <h3>{weather.temperature}°C</h3>

            <p className="condition">
              {weather.condition}
            </p>

            <div className="weather-details">

              <div>
                <span>💧</span>
                <p>Humidity</p>
                <strong>{weather.humidity}%</strong>
              </div>

              <div>
                <span>💨</span>
                <p>Wind Speed</p>
                <strong>{weather.wind_speed} m/s</strong>
              </div>

              <div>
                <span>🌡️</span>
                <p>Minimum</p>
                <strong>{weather.min_temperature}°C</strong>
              </div>

              <div>
                <span>🔥</span>
                <p>Maximum</p>
                <strong>{weather.max_temperature}°C</strong>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default App

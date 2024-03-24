import { getWeather } from '../apis/weatherApi.ts'
import { useQuery } from '@tanstack/react-query'

export default function Weather() {
  //creating a const here to store the city name from your new input field
  // const [city, setCity] = useState('Wellington')

  const {
    data: weather,
    isError,
    isLoading,
  } = useQuery(['weather'], () => getWeather('Wellington')) //pass city

  if (isError) {
    return <div className="weather-container">Error retrieving the weather</div>
  }
  if (!weather || isLoading) {
    return <div className="weather-container">Weather is loading..</div>
  }

  // Extract relevant data from the weather API response
  const {
    location,
    current: {
      temp_c,
      temp_f,
      condition,
      wind_kph,
      humidity,
      pressure_mb,
      last_updated,
    },
  } = weather

  // Format date and time
  const currentDate = new Date(last_updated)
  const formattedDate = currentDate.toLocaleDateString()
  const formattedTime = currentDate.toLocaleTimeString()

  return (
    <div className="wrapper">
      <div className="widget-container bg-white border border-gray-300 text-black rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/2 p-4">
            <h1 className="text-2xl font-semibold text-black" id="city">
              {location.name}
            </h1>
            <h2 id="day" className="text-lg text-black">
              {formattedDate}
            </h2>
            <h3 id="date" className="text-lg text-black">
              {formattedTime}
            </h3>
            <p className="geo text-black">{location.country}</p>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h1 id="weather-status" className="text-xl text-black">
              Weather / {condition.text}
            </h1>
            <img
              className="weather-icon w-24 h-24 mx-auto"
              src={condition.icon}
              alt={condition.text}
            />
          </div>
        </div>
        <hr className="border-t-2 border-blue-700 mx-4" />
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/2 p-4">
            <h1 id="temperature" className="text-4xl font-semibold text-black">
              {temp_c}
            </h1>
            <h2 id="celsius" className="text-xl text-black">
              &deg;C
            </h2>
            <h2 id="temp-divider" className="text-xl text-black">
              /
            </h2>
            <h2 id="fahrenheit" className="text-xl text-black">
              {temp_f}&deg;F
            </h2>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <div className="other-details-key">
              <br />
              <p className="text-lg text-black">Wind Speed</p>
              <p className="text-lg text-black">Humidity</p>
              <p className="text-lg text-black">Pressure</p>
            </div>
            <div className="other-details-values">
              <br />
              <p className="windspeed text-lg text-black">{wind_kph} Km/h</p>
              <p className="humidity text-lg text-black">{humidity} %</p>
              <p className="pressure text-lg text-black">{pressure_mb} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

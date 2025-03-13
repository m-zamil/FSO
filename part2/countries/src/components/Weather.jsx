import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = ({ latlng }) => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API}&units=metric
      `
      )
      .then((response) => {
        setWeatherData(response.data);
      });
  }, []);

  const weatherInfo = weatherData ? (
    <div>
      <div>Temperature {weatherData.main.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
      <div>Wind {weatherData.wind.speed} m/s</div>
    </div>
  ) : (
    "loading"
  );

  return <div>{weatherInfo}</div>;
};

export default Weather;

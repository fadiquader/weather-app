import React, { useState, useEffect } from 'react';
//
import { getCurrentLocation } from '../utils/helpers';
import { fetchWeather } from "../services/weather";
import { WeatherItem } from '../components';

export const CurrentLocation = props => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const fetchMyLocation = async () => {
    try {
      setFetching(true)
      const coords = await getCurrentLocation();
      const res = await fetchWeather(coords, props.tempSystem);
      const weatherData = await res.json();
      if(weatherData.cod !== 200) {
        setError(weatherData.message);
        return;
      }
      weatherData.tempSystem = props.tempSystem
      setData(weatherData)
    } catch (e) {
      setError(e.message || 'Something went wrong!')
    } finally {
      setFetching(false)
    }
  };
  useEffect(() => {
    fetchMyLocation()
  }, [props.tempSystem]);

  return (
    <div className="widget current-widget">
      <h3>Your Weather</h3>
      {
        fetching && <p>Loading...</p>
      }
      {
        error && (
          <div className="alert alert-error">
            {error}
          </div>
        )
      }
      {
        data && <WeatherItem data={data} />
      }
    </div>
  )
}

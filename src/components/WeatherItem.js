import React from 'react';
import { TEMP_SYS } from '../utils/constants';

export const WeatherItem = ({ data }) => {
  const tempSymp = TEMP_SYS[data.tempSystem];
  return (
    <div>
      <p><b>Location: </b><span>{data.name}, {data.sys.country}</span></p>
      <p><b>Humidity: </b><span>{data.main.humidity}</span></p>
      <p><b>Pressure: </b>{data.main.pressure}</p>
      <p><b>Temperature: </b>{Math.ceil(data.main.temp)}{tempSymp}</p>
      <p><b>Status: </b>{data.weather[0].main}</p>
    </div>
  )
}

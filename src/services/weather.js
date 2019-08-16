// npm modules
import qs from 'qs';
// project files
import { WEATHER_API_KEY, WEATHER_API_URL } from '../utils/constants';

export function fetchWeather(params, system='metric') {
  const queryString = qs.stringify(params);
  // imperial
  return fetch(`${WEATHER_API_URL}?${queryString}&appid=${WEATHER_API_KEY}&units=${system}`);
}

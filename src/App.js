import React, { useState, useEffect } from 'react';
//
import {
  SearchForm,
  CurrentLocation,
  WeatherItem,
  SearchHistory
} from './components';
import './App.css';
import { TEMP_SYS } from "./utils/constants";

function App() {
  const [searchData, setSearchData] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const [tempSystem, setTempSystem] = useState('metric')
  const parseSearchHistory = () => {
    let searchItems = localStorage.getItem('searchItems');
    if(searchItems) {
      searchItems = JSON.parse(searchItems);
    } else {
      searchItems = []
    }
    searchItems = searchItems.slice(0, 2);
    return searchItems
  }
  const handleSearch = data => {
    let searchItems = parseSearchHistory();
    searchItems.unshift({
      tempSystem: data.tempSystem,
      name: `${data.name}, ${data.sys.country}`,
      temp: `${Math.ceil(data.main.temp)}${TEMP_SYS[tempSystem] || 'C'}`,
      id: data.id+Math.random(),
    });
    localStorage.setItem('searchItems', JSON.stringify(searchItems));
    data.tempSystem = tempSystem;
    setSearchData(data)
    setSearchHistory(searchItems)
  };
  const handleTempSystemChange = e => {
    setTempSystem(e.target.value)
  }
  useEffect(() => {
    const searchItems = parseSearchHistory();
    setSearchHistory(searchItems)
  }, [])
  return (
    <section>
      <div className="navbar">
        <div><b>Weather App</b></div>
        {/*imperial*/}
        <div>
          <span>Change temperature system: </span>
          <select value={tempSystem} onChange={handleTempSystemChange}>
            <option value="metric">Celsius</option>
            <option value="imperial">Fahrenheit</option>
          </select>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div>
            <CurrentLocation tempSystem={tempSystem} />
            <SearchHistory items={searchHistory} />
          </div>
          <div className="widget flex-1">
            <SearchForm onSearch={handleSearch} tempSystem={tempSystem}>
              {
                searchData && <WeatherItem data={searchData} />
              }
            </SearchForm>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

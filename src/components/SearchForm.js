import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
//
import { fetchWeather } from "../services/weather";

export const SearchForm = props => {
  const [error, setError] = useState();
  const [fetching, setFetching] = useState(false);
  const formRef = useRef();
  const handleSearch = async e => {
    e.preventDefault();
    setError(null);
    const { elements } = e.target;
    const formData = new FormData(e.target);
    const params = {};
    for (let entry of formData.entries()) {
      const key = entry[0];
      const value = entry[1];
      if(value) {
        switch (key) {
          case 'city':
            params.q = `${value},us`;
            break;
          case 'zip':
            params.zip = `${value},us`;
            break;
          default :
            params[key] = elements[key].value;
            break;
        }
      }
    }
    try {
      setFetching(true)
      const res = await fetchWeather(params, props.tempSystem);
      const data = await res.json();
      if(data.cod !== 200) {
        setError(data.message);
        return;
      }
      props.onSearch(data)
    } catch (e) {
      setError(e.message);
      console.log(e)
    } finally {
      setFetching(false)
    }
  };
  const resetForm = () => {
    formRef.current.reset();
  };

  return (
    <div>
      <form className="form search-form" ref={formRef} onSubmit={handleSearch}>
        <div className="inputs">
          <div className="form-item">
            <input
              placeholder="City (Texas, New York, ...)"
              name="city"
              type="text"
            />
          </div>
          <div className="form-item">
            <input placeholder="Longitude" name="lon" type="text"/>
          </div>
          <div className="form-item">
            <input placeholder="Latitude" name="lat" type="text"/>
          </div>
          <div className="form-item">
            <input placeholder="Zip code" name="zip" type="text"/>
          </div>
        </div>
        <div className="form-btns">
          <button className="w-btn" onClick={resetForm}>
            Clear
          </button>
          <button disabled={fetching} className="w-btn w-btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      {fetching && <div>Loading...</div>}
      {
        error && (
          <div className="alert alert-error">
            {error}
          </div>
        )
      }
      {props.children}
    </div>
  )
};
SearchForm.propTypes = {
  onSearch: PropTypes.func,
};
SearchForm.defaultPropTypes = {
  onSearch: () => null,
}

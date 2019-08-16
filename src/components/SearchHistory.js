import React from 'react';

export const SearchHistory = props => {
  return (
    <div className="widget">
      <h3>Search history</h3>
      <ul>
        {
          props.items.map(item => {
            return (
              <li key={item.id}>
                {item.name}, <b>Temp: </b> {item.temp}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

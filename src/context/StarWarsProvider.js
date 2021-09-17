import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';

import fetchApi from '../services/api';

export default function StarwarsProvider({ children }) {
  const [data, setPlanet] = useState([]);

  async function setPlanets() {
    try {
      const response = await fetchApi();
      setPlanet(response);
    } catch (error) {
      setPlanet(error);
    }
  }

  useEffect(() => {
    setPlanets();
  }, []);

  return (
    <StarWarsContext.Provider value={ { data } }>
      {children}
    </StarWarsContext.Provider>
  );
}

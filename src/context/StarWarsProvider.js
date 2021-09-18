import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

import fetchApi from '../services/api';

export default function StarwarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
    },
  });

  const newData = data.filter((element) => element.name.includes(filter.filters.filterByName.name));

  async function setPlanets() {
    try {
      const response = await fetchApi();
      setData(response);
    } catch (error) {
      setData(error);
    }
  }

  useEffect(() => {
    setPlanets();
  }, []);

  return (
    <StarWarsContext.Provider value={ { newData, data, filter, setFilter } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarwarsProvider.propsTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

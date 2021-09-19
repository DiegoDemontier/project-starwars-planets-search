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
      filterByNumericValues: [],
    },
  });

  function newFilter() {
    let newData = [];
    let values = [];

    if (filter.filters.filterByNumericValues.length > 0) {
      values = Object.values(filter.filters.filterByNumericValues[0]);
    }

    if (values[1] === 'maior que') {
      newData = data.filter((element) => element[values[0]] > Number(values[2]));
    } else if (values[1] === 'menor que') {
      newData = data.filter((element) => element[values[0]] < Number(values[2]));
    } else if (values[1] === 'igual a') {
      newData = data.filter((element) => element[values[0]] === Number(values[2]));
    } else {
      newData = data.filter((element) => element.name.toLowerCase()
        .includes(filter.filters.filterByName.name.toLowerCase()));
    }
    return newData;
  }

  async function setPlanets() {
    try {
      const response = await fetchApi();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPlanets();
  }, []);

  return (
    <StarWarsContext.Provider
      value={ {
        data,
        filter,
        setFilter,
        newFilter,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarwarsProvider.propsTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

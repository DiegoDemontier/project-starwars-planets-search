import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

import fetchApi from '../services/api';

export default function StarwarsProvider({ children }) {
  const [name, setName] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const filter = {
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
  };

  const newData = data.filter((element) => element.name.toLowerCase()
    .includes(name.toLowerCase()));

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
    <StarWarsContext.Provider
      value={ {
        setName,
        setColumn,
        setComparison,
        setValue,
        newData,
        data,
        filter,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarwarsProvider.propsTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

import fetchApi from '../services/api';

export default function StarwarsProvider({ children }) {
  const NUMBER = -1;
  const [data, setData] = useState([]);
  const [counter, setCouter] = useState(0);
  const [columns, setColumns] = useState([]);
  const [newColumns, setNewColumns] = useState([]);
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  });

  const { column, sort } = filter.filters.order;
  // REFERENCE https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  if (sort === 'ASC') {
    if (column === 'name'
    || column === 'terrain'
    || column === 'films'
    || column === 'url') {
      data.sort((a, b) => {
        if (a[column] > b[column]) return 1;
        if (a[column] < b[column]) return NUMBER;
        return 0;
      });
    } else {
      data.sort((a, b) => Number(a[column]) - Number(b[column]));
    }
  } else if (sort === 'DESC') {
    if (column === 'name'
    || column === 'terrain'
    || column === 'films'
    || column === 'url') {
      data.sort((a, b) => {
        if (a[column] < b[column]) return 1;
        if (a[column] > b[column]) return NUMBER;
        return 0;
      });
    } else {
      data.sort((a, b) => Number(b[column]) - Number(a[column]));
    }
  }

  function newFilter() {
    let newData = [];
    let values = [];

    if (filter.filters.filterByNumericValues.length > 0) {
      values = Object.values(filter.filters.filterByNumericValues[counter - 1]);
    }

    if (values[1] === 'maior que') {
      newData = data.filter((element) => element[values[0]] > Number(values[2]))
        .filter((element) => element.name.toLowerCase()
          .includes(filter.filters.filterByName.name.toLowerCase()));
    } else if (values[1] === 'menor que') {
      newData = data.filter((element) => element[values[0]] < Number(values[2]))
        .filter((element) => element.name.toLowerCase()
          .includes(filter.filters.filterByName.name.toLowerCase()));
    } else if (values[1] === 'igual a') {
      newData = data.filter((element) => element[values[0]] === values[2])
        .filter((element) => element.name.toLowerCase()
          .includes(filter.filters.filterByName.name.toLowerCase()));
    } else {
      newData = data.filter((element) => element.name.toLowerCase()
        .includes(filter.filters.filterByName.name.toLowerCase()));
    }
    return newData;
  }

  let arrayData = data.reduce((__, acc) => acc, []);
  arrayData = Object.keys(arrayData).filter((key) => key !== 'residents');

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

  useEffect(() => {
    setColumns(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  }, []);

  return (
    <StarWarsContext.Provider
      value={ {
        arrayData,
        filter,
        setFilter,
        newFilter,
        setCouter,
        counter,
        columns,
        setColumns,
        newColumns,
        setNewColumns,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

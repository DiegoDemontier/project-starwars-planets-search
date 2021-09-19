import React, { useContext, useEffect, useState } from 'react';
import StarwarsContext from '../context/StarWarsContext';

function Search() {
  const { setFilter, filter } = useContext(StarwarsContext);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  /* function handleChange({ target }) {
    setName(target.value);
  } */

  useEffect(() => {
    const filterByText = {
      filters: {
        filterByName: {
          name,
        },
        filterByNumericValues: [],
      },
    };
    setFilter({ ...filterByText });
  }, [name]);

  function handleSubmit(event) {
    event.preventDefault();
    const filterByNumericValues = [
      {
        column,
        comparison,
        value,
      }];

    let currentValue = filter.filters.filterByNumericValues;
    currentValue = [...currentValue, ...filterByNumericValues];
    filter.filters = { ...filter.filters, filterByNumericValues: currentValue };
    setFilter({ ...filter });
  }

  /* function handleSubmit(event) {
    event.preventDefault();
    const filterByNumericValues = [
      {
        column,
        comparison,
        value,
      }];

    getFilter(filterByNumericValues);
  } */

  function renderFilterByName() {
    return (
      <label htmlFor="name">
        <input
          data-testid="name-filter"
          name="name"
          id="name"
          type="text"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
    );
  }

  return (
    <div>
      { renderFilterByName() }
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            name="column"
            id="column"
            required
            onChange={ ({ target }) => setColumn(target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            required
            onChange={ ({ target }) => setComparison(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            data-testid="value-filter"
            name="value"
            id="value"
            type="number"
            required
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}

export default Search;

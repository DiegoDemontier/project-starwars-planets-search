import React, { useContext, useState } from 'react';
import FiltersRemoved from './FiltersRemoved';
import StarwarsContext from '../context/StarWarsContext';

function Search() {
  const {
    setFilter,
    filter,
    setCouter,
    setNewColumns,
    columns,
    newColumns,
  } = useContext(StarwarsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  function handleChange({ target }) {
    const { filterByName } = filter.filters;
    filterByName.name = target.value;
    setFilter({ ...filter });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const filterByNumericValues = [
      {
        column,
        comparison,
        value,
      }];
    const index = columns.findIndex((e) => e === column);
    columns.splice(index, 1);

    setNewColumns([...newColumns, column]);

    let currentValue = filter.filters.filterByNumericValues;
    currentValue = [...currentValue, ...filterByNumericValues];
    filter.filters = { ...filter.filters, filterByNumericValues: currentValue };
    setCouter((prevState) => prevState + 1);
    setFilter({ ...filter });
  }

  function renderFilterByName() {
    return (
      <label htmlFor="name">
        <input
          data-testid="name-filter"
          name="name"
          id="name"
          type="text"
          onChange={ handleChange }
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
            {columns.map((element, index) => (
              <option key={ index } value={ element }>{ element }</option>
            ))}
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
      <FiltersRemoved />
    </div>
  );
}

export default Search;

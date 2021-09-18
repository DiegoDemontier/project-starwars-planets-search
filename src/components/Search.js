import React, { useContext, useEffect, useState } from 'react';
import StarwarsContext from '../context/StarWarsContext';

function Search() {
  const { search, setFilter } = useContext(StarwarsContext);
  const [name, setName] = useState('');

  const newFilter = {
    filters: {
      filterByName: {
        name,
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
  };

  function handleFilter({ target }) {
    if (target.name === 'name') setName(target.value);
    setFilter(newFilter);
  }

  return (
    <form>
      <label htmlFor="name">
        <input
          data-testid="name-filter"
          name="name"
          id="name"
          type="text"
          onChange={ handleFilter }
        />
      </label>
    </form>
  );
}

export default Search;

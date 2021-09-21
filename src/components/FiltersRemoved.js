import React, { useContext } from 'react';
import StarwarsContext from '../context/StarWarsContext';

export default function FiltersRemoved() {
  const {
    newColumns,
    filter,
    setFilter,
    counter,
    setCouter,
    setColumns,
    columns,
  } = useContext(StarwarsContext);

  function handleClick(columnText) {
    const index = newColumns.findIndex((e) => e === columnText);
    newColumns.splice(index, 1);
    filter.filters.filterByNumericValues.splice((counter - 1), 1);

    setColumns([...columns, columnText]);
    setCouter((prevCounter) => prevCounter - 1);
    setFilter({ ...filter });
  }

  if (newColumns.length > 0) {
    return (
      <div>
        {newColumns.map((column) => (
          <span key={ column } data-testid="filter">
            { column }
            <button onClick={ () => handleClick(column) } type="button">x</button>
          </span>
        ))}
      </div>
    );
  }
  return (null);
}

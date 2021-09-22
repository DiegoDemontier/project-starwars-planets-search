import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { arrayData, filter, data, counter } = useContext(StarWarsContext);

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

  return (
    <table>
      <thead>
        <tr>
          {arrayData.map((element, index) => (
            <th key={ index }>{element}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {newFilter().map((element) => (
          <tr key={ element.name }>
            <td data-testid="planet-name">{element.name}</td>
            <td>{element.rotation_period}</td>
            <td>{element.orbital_period}</td>
            <td>{element.diameter}</td>
            <td>{element.climate}</td>
            <td>{element.gravity}</td>
            <td>{element.terrain}</td>
            <td>{element.surface_water}</td>
            <td>{element.population}</td>
            <td>{element.films}</td>
            <td>{element.created}</td>
            <td>{element.edited}</td>
            <td>{element.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

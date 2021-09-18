import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data, filter, newData } = useContext(StarWarsContext);
  const { filters: { filterByName: { name } } } = filter;

  let arrayData = data.reduce((__, acc) => acc, []);
  arrayData = Object.keys(arrayData).filter((key) => key !== 'residents');

  /* let newData = []; */

  /* function newObjectData(text) {
    newData = data.filter((element) => element.name.includes(text));
    return newData;
  } */

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
        {newData.map((element) => (
          <tr key={ element.name }>
            <td>{element.name}</td>
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

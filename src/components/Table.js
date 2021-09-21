import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { arrayData, newFilter } = useContext(StarWarsContext);

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

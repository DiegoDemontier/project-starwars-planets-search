import React from 'react';
import './App.css';
import Table from './components/Table';
import StarwarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarwarsProvider>
      <div>
        <Table />
      </div>
    </StarwarsProvider>
  );
}

export default App;

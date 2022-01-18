import React from 'react';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import StarwarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarwarsProvider>
      <div>
        <div className="conteiner">
          <Search />
        </div>
        <div>
          <Table />
        </div>
      </div>
    </StarwarsProvider>
  );
}

export default App;

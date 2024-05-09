import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuLateral from './components/MenuLateral/MenuLateral';
import GridClientes from './components/GridClientes/GridClientes';
import GridRoteadores from './components/GridRoteadores/GridRoteadores';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <MenuLateral />
        <div className="flex-grow pl-64">
          <Routes>
            <Route path="/clientes" element={<GridClientes />} />
            <Route path="/roteadores" element={<GridRoteadores />} />
            <Route path="/" element={<GridClientes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const MenuLateral = () => {
  return (
    <div className="h-screen w-64 fixed bg-gray-800 text-white">
      <div className="text-2xl font-bold text-center border-b-2">
        Menu
      </div>
      <nav className="mt-4">
        <Link to="/clientes" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Clientes
        </Link>
        <Link to="/roteadores" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Roteadores
        </Link>
      </nav>
    </div>
  );
};

export default MenuLateral;
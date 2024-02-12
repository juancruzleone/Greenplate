import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from './logOut';

const Nav = () => {

  const authToken = localStorage.getItem('authToken');

  return (
    <nav className="navPage">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/quienes-somos">Quiénes somos</Link>
        </li>
        <li>
          <Link to="/recetas">Recetas</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        {authToken && (
          <li>
            <Link to="/comunidad/">Comunidad</Link> 
          </li>
        )}
        {authToken && (
          <li>
            <Link to="/panel">Panel</Link>
          </li>
        )}
        {!authToken && (
          <li>
            <Link to="/login">Iniciar sesión</Link>
          </li>
        )}
        {authToken && <LogOut />}
      </ul>
    </nav>
  );
}

export default Nav;

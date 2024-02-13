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
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        <div className="auth-buttons">
          {!authToken && (
            <li className='contenedor-auth'>
              <Link to="/login">
                <img src="usuario.png" alt="Iniciar sesión" /> {/* Imagen para iniciar sesión */}
              </Link>
            </li>
          )}
          <div className='contenedor-iconos-nav'>
          {authToken && (
            <li className='contenedor-auth-logeado'>
              <Link to="/mi-perfil/">
                <img src="usuario.png" alt="Perfil de usuario" /> {/* Imagen para el perfil de usuario */}
              </Link>
            </li>
          )}
          {authToken && <LogOut />}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
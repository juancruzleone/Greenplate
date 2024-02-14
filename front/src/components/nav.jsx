import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  // Estado local para almacenar el estado de autenticación
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Realizar la lógica de cierre de sesión
    // Eliminar el token de autenticación del almacenamiento local
    localStorage.removeItem('authToken');
    // Actualizar el estado de autenticación
    setAuthToken(null);
    // Recargar la página
    window.location.reload();
  };

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
          {authToken && <button onClick={handleLogout} className='contenedor-auth-logeado'>
            <img src="cerrar-sesion.png" alt="Icono cerrar sesion" />
            </button>}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;

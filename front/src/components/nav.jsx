import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [perfilId, setPerfilId] = useState(localStorage.getItem('perfilId'));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('perfilId');
    setAuthToken(null);
    setPerfilId(null);
    window.location.reload();
  };

  return (
    <nav className="navPage">
      <ul>
        <li>
          <Link to="/">
            <img src="logo-greenpalate-blanco.png" alt="Logo greenpalate" className='logo-nav'/>
          </Link>  
        </li>
        <li>
          <Link to="/" className='secciones'>Home</Link>
        </li>
        <li>
          <Link to="/quienes-somos" className='secciones'>Quiénes somos</Link>
        </li>
        <li>
          <Link to="/recetas" className='secciones'>Recetas</Link>
        </li>
        
        {authToken && (
          <li>
            <Link to="/comunidad/" className='secciones'>Comunidad</Link> 
          </li>
        )}
        {authToken && (
          <li>
            <Link to="/panel" className='secciones'>Panel</Link>
          </li>
        )}
        <li>
          <Link to="/contacto" className='secciones'>Contacto</Link>
        </li>
        <div className="auth-buttons">
          {!authToken && (
            <li className='contenedor-auth'>
              <Link to="/login">
                <img src="usuario.webp" alt="Iniciar sesión" />
              </Link>
            </li>
          )}
          <div className='contenedor-iconos-nav'>
          {authToken && (
            <li className='contenedor-auth-logeado'>
              <Link to={`/mi-perfil/${perfilId}`}>
                <img src="usuario.webp" alt="Perfil de usuario" />
              </Link>
            </li>
          )}
          {authToken && <button onClick={handleLogout} className='contenedor-auth-logeado'>
            <img src="cerrar-sesion.webp" alt="Icono cerrar sesion"/>
            </button>}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;

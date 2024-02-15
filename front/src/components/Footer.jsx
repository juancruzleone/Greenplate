import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src="logo-greenpalate-blanco.webp" alt="Logo greenpalate" className='img-footer'/>
        </div>
        <div className="footer-links">
          <ul>
            <li>
                <Link to="/">Inicio</Link>
                <Link to="/">Quiénes somos</Link>
                <Link to="/recetas">recetas</Link>
                <Link to="/contacto">contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

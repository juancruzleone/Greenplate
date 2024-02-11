import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navpanel.css'

const NavPanel = ({ onSolapaClick, solapaActiva }) => {
  return (
    <nav className='navPanel'>
      <ul>
        <li>
          <Link className={solapaActiva === 'recetas' ? 'active' : ''} onClick={() => onSolapaClick('recetas')}>
            Recetas
          </Link>
        </li>
        <li>
          <Link className={solapaActiva === 'contactos' ? 'active' : ''} onClick={() => onSolapaClick('contactos')}>
            Contactos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavPanel;

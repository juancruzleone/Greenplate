import { Link } from 'react-router-dom'
import LogOut from './logOut'

const Nav = () => {
    return(
        <nav className="navPage">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quienes-somos">Quienes somos</Link>
            </li>
            <li>
              <Link to="/recetas">Recetas</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/comunidad/">Comunidad</Link> 
            </li>
            <li>
              <Link to="/panel">Panel</Link>
            </li>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
          
            <LogOut />
          </ul>
        </nav>
    )
}

export default Nav
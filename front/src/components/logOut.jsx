import { useContext } from 'react'
import { SessionContext, useSession } from '../context/sessionContext'

const LogOut = () => {

    const { perfil, onLogOut} = useSession()

    return (
        <li onClick={onLogOut} className='contenedor-auth'>
            <img src="cerrar-sesion.webp" alt="icono cerrar sesión" id='cerrar-sesion'/>
        </li>
    )
}

export default LogOut
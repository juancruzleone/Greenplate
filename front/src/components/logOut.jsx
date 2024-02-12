import { useContext } from 'react'
import { SessionContext, useSession } from '../context/sessionContext'

const LogOut = () => {

    const { perfil, onLogOut} = useSession()

    return (
        <li onClick={onLogOut} className='boton-logout'>Cerrar sesión {perfil.name} </li>
    )
}

export default LogOut
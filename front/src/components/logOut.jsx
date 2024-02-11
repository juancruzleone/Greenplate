import { useContext } from 'react'
import { SessionContext, useSession } from '../context/sessionContext'

const LogOut = () => {
    const { perfil, onLogOut } = useSession()

    const handleLogOut = () => {
        console.log('Sesión cerrada para:', perfil && perfil.name); // Imprimir nombre del usuario
        onLogOut(); // Llamar a la función de logout
    }

    return (
        <li onClick={handleLogOut} className="boton-logout">Cerrar sesión</li>
    )
}

export default LogOut

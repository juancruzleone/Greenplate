import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/usuarios');

        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <>
      <h1>Listado de usuarios</h1>
      <div className='contenedor-usuarios-listado'>
        {usuarios.map((usuario, index) => (
          <div key={index} className='tarjeta-usuario-listado'>
            <h3>{usuario.userName}</h3>
            <p>ID: {usuario._id}</p>
            <Link to={`/mi-perfil/${usuario._id}`}>Ver perfil</Link>
            {/* Agrega más detalles del usuario según tus necesidades */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Usuarios;

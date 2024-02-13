import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detalle-receta.css';

const DetallesReceta = ({ tipoReceta }) => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");
  const [usuariosAyudando, setUsuariosAyudando] = useState([]);

  useEffect(() => {
    const obtenerDetallesReceta = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/recetas/${id}`);
        const data = await response.json();
        setReceta(data);

        // Obtener listado de usuarios ayudando
        const usuariosAyudandoResponse = await fetch(`http://localhost:3333/api/recetas/${id}/usuarios-ayudando`);
        const usuariosAyudandoData = await usuariosAyudandoResponse.json();
        setUsuariosAyudando(usuariosAyudandoData);
      } catch (error) {
        console.error(`Error al obtener detalles de la receta:`, error);
      }
    };

    obtenerDetallesReceta();
  }, [id, tipoReceta]);

  const invitarUsuario = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error('Token no encontrado. Usuario no autenticado.');
        return;
      }

      const response = await fetch(`http://localhost:3333/api/recetas/invitar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ recetaId: id, usuarioId }),
      });

      if (!response.ok) {
        throw new Error('Error al invitar usuario a la receta');
      }

      console.log('Usuario invitado con éxito');

      // Actualizar lista de usuarios ayudando después de invitar a uno nuevo
      const usuariosAyudandoResponse = await fetch(`http://localhost:3333/api/recetas/${id}/usuarios-ayudando`);
      const usuariosAyudandoData = await usuariosAyudandoResponse.json();
      setUsuariosAyudando(usuariosAyudandoData);
    } catch (error) {
      console.error('Error al invitar usuario:', error.message);
    }
  };

  const eliminarUsuario = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error('Token no encontrado. Usuario no autenticado.');
        return;
      }

      const response = await fetch(`http://localhost:3333/api/recetas/eliminar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ recetaId: id, usuarioId }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar usuario de la receta');
      }

      console.log('Usuario eliminado con éxito');

      // Actualizar lista de usuarios ayudando después de eliminar a uno
      const usuariosAyudandoResponse = await fetch(`http://localhost:3333/api/recetas/${id}/usuarios-ayudando`);
      const usuariosAyudandoData = await usuariosAyudandoResponse.json();
      setUsuariosAyudando(usuariosAyudandoData);
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
    }
  };

  if (!receta) {
    return <div>Cargando detalles de la receta...</div>;
  }

  const ingredientesArray = Array.isArray(receta.ingredientes)
    ? receta.ingredientes
    : receta.ingredientes.split(',').map((ingrediente) => ingrediente.trim());

  return (
    <div className='contenedor-detalle'>
        <div className='img-detalle'>
            <img src={receta.img} alt={receta.name} />
        </div>
        <div className='contenido-detalle'>
            <h2>{receta.name}</h2>
            <p className='categoria-detalle'>{receta.categoria}</p>
            <h3>Descripción</h3>
            <p>{receta.description}</p>
            <h3>Ingredientes</h3>
            <ul>
              {ingredientesArray.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>

            {/* Input para ingresar el nombre de usuario */}
            <label htmlFor="usuarioId" className="label-usuario">Nombre de Usuario:</label>
            <div className="contenedor-usuario">
              <input
                type="text"
                id="usuarioId"
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
              />

              {/* Botones para invitar y eliminar usuarios */}
              <div className="contenedor-botones">
                <button onClick={invitarUsuario} className="agregar">Agregar Usuario</button>
                <button onClick={eliminarUsuario} className="eliminar">Eliminar Usuario</button>
              </div>
            </div>

            {/* Mostrar listado de usuarios ayudando */}
            <div className="usuarios-ayudando">
              <h3>Usuarios Ayudando</h3>
              <ul>
                {usuariosAyudando.map((usuario, index) => (
                  <li key={index}>{usuario.nombre}</li>
                ))}
              </ul>
            </div>
        </div>
    </div>
  );
};

export default DetallesReceta;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detalle-receta.css';

const DetallesReceta = ({ tipoReceta }) => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");
  const [usuariosAyudando, setUsuariosAyudando] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Función para verificar si el usuario está autenticado
    const checkAuthentication = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

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
      await fetch(`http://localhost:3333/api/recetas/${id}/invitar/${usuarioId}`, { method: 'POST' });
      // Recargar los usuarios ayudando después de invitar uno nuevo
      const usuariosAyudandoResponse = await fetch(`http://localhost:3333/api/recetas/${id}/usuarios-ayudando`);
      const usuariosAyudandoData = await usuariosAyudandoResponse.json();
      setUsuariosAyudando(usuariosAyudandoData);
    } catch (error) {
      console.error(`Error al invitar usuario:`, error);
    }
  };

  const eliminarUsuario = async () => {
    try {
      await fetch(`http://localhost:3333/api/recetas/${id}/eliminar/${usuarioId}`, { method: 'DELETE' });
      // Recargar los usuarios ayudando después de eliminar uno
      const usuariosAyudandoResponse = await fetch(`http://localhost:3333/api/recetas/${id}/usuarios-ayudando`);
      const usuariosAyudandoData = await usuariosAyudandoResponse.json();
      setUsuariosAyudando(usuariosAyudandoData);
      // Limpiar el input después de eliminar el usuario
      setUsuarioId("");
    } catch (error) {
      console.error(`Error al eliminar usuario:`, error);
    }
  };

  if (!receta) {
    return <div>Cargando detalles de la receta...</div>;
  }

  const ingredientesArray = Array.isArray(receta.ingredientes)
    ? receta.ingredientes
    : receta.ingredientes.split(',').map((ingrediente) => ingrediente.trim());

  return (
    <>
      <div className='contenedor-detalle'>
        <div className='img-detalle'>
          <img src={receta.img} alt={receta.name} />
        </div>
        <div className='contenido-detalle'>
          <h2>{receta.name}</h2>
          <p className='categoria-detalle'>{receta.categoria}</p>

          {/* Input para ingresar el nombre de usuario, solo visible si el usuario está autenticado */}
          {isAuthenticated && (
            <div>
              <label htmlFor="usuarioId" className="label-usuario">Nombre de Usuario:</label>
              <div className="contenedor-usuario">
                <input
                  type="text"
                  id="usuarioId"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Botones para invitar y eliminar usuarios, solo visibles si el usuario está autenticado */}
          {isAuthenticated && (
            <div className="contenedor-botones">
              <button onClick={invitarUsuario} className="agregar">Agregar Usuario</button>
              <button onClick={eliminarUsuario} className="eliminar">Eliminar Usuario</button>
            </div>
          )}

          {/* Mostrar listado de usuarios ayudando */}
          <div className="usuarios-ayudando">
            <h3>Usuarios Ayudando</h3>
            <ul>
              {usuariosAyudando.map((usuario, index) => (
                <li key={index}>
                  {usuario.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='contenedor-detalle-receta'>
        <h3>Descripción</h3>
        <p>{receta.description}</p>
        <h3>Ingredientes</h3>
        <ul>
          {ingredientesArray.map((ingrediente, index) => (
            <li key={index} className='detalle-ingredientes'>{ingrediente}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DetallesReceta;

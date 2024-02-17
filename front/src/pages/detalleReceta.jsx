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
      // Actualizar el estado local con el nuevo usuario invitado
      setUsuariosAyudando([...usuariosAyudando, { name: usuarioId }]);
      // Limpiar el input después de invitar al usuario
      setUsuarioId("");
    } catch (error) {
      console.error(`Error al invitar usuario:`, error);
    }
  };

  const eliminarUsuario = async () => {
    try {
      await fetch(`http://localhost:3333/api/recetas/${id}/eliminar/${usuarioId}`, { method: 'DELETE' });
      // Filtrar el usuario eliminado y actualizar el estado local
      const nuevosUsuariosAyudando = usuariosAyudando.filter(usuario => usuario.name !== usuarioId);
      setUsuariosAyudando(nuevosUsuariosAyudando);
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
        </div>
      </div>
      <div className='contenedor-detalle-receta'>
        <div className='contenido-receta'>
          <h3>Descripción</h3>
          <p>{receta.description}</p>
          <h3>Ingredientes</h3>
          <ul>
            {ingredientesArray.map((ingrediente, index) => (
              <li key={index} className='detalle-ingredientes'>{ingrediente}</li>
            ))}
          </ul>  
        </div>
        <div className="usuarios-ayudando">
            <h3>Usuarios Ayudando</h3>
            <ul>
              {usuariosAyudando.map((usuario, index) => (
                <li key={index}>
                  {usuario.name}
                </li>
              ))}
            </ul>
            {usuariosAyudando.length === 0 && (
            <p>No hay usuarios ayudando.</p>
          )}
        </div>
      
      </div>
    </>
  );
};

export default DetallesReceta;

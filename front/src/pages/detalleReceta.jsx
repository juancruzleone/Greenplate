import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detalle-receta.css';

const DetallesReceta = ({ tipoReceta }) => {
  const { id } = useParams();
  const [receta, setReceta] = useState({});
  const [usuarioId, setUsuarioId] = useState("");
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
      } catch (error) {
        console.error(`Error al obtener detalles de la receta:`, error);
      }
    };

    obtenerDetallesReceta();
  }, [id, tipoReceta]);

  const invitarUsuario = async () => {
    try {
      // Aquí realizaríamos una verificación adicional antes de enviar la solicitud
      // Para simplificar, se puede realizar una verificación en el frontend
      if (usuarioId.trim() === "") {
        console.error("Nombre de usuario vacío");
        return;
      }
      
      // Lógica para enviar la solicitud de invitación...
      console.log("Invitación enviada al usuario:", usuarioId);

      // Actualizar la receta local con el nuevo usuario invitado
      const updatedReceta = { ...receta };
      updatedReceta.usuariosInvitados.push(usuarioId);
      setReceta(updatedReceta);

      // Limpiar el input después de invitar al usuario
      setUsuarioId("");
    } catch (error) {
      console.error(`Error al invitar usuario:`, error);
    }
  };

  const eliminarUsuario = async () => {
    try {
      // Lógica para enviar la solicitud de eliminación...
      console.log("Solicitud de eliminación enviada para el usuario:", usuarioId);

      // Actualizar la receta local eliminando al usuario
      const updatedReceta = { ...receta };
      updatedReceta.usuariosInvitados = updatedReceta.usuariosInvitados.filter(usuario => usuario !== usuarioId);
      setReceta(updatedReceta);
    } catch (error) {
      console.error(`Error al eliminar usuario:`, error);
    }
  };

  if (!receta.name) {
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

          {/* Botones para invitar usuarios y eliminar usuarios, solo visibles si el usuario está autenticado */}
          {isAuthenticated && (
            <div className="contenedor-botones">
              <button onClick={invitarUsuario} className="agregar">Agregar Usuario</button>
              <button onClick={eliminarUsuario} className="eliminar">Eliminar Usuario</button>
            </div>
          )}

          {/* Mostrar listado de usuarios invitados */}
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
              {receta.usuariosInvitados && receta.usuariosInvitados.map((usuario, index) => (
                <li key={index}>
                  {usuario}
                </li>
              ))}
            </ul>
            {receta.usuariosInvitados.length === 0 && (
              <p>No hay usuarios invitados.</p>
            )}
          </div>
      </div>
    </>
  );
};

export default DetallesReceta;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detalle-receta.css';

const DetallesReceta = ({ tipoReceta }) => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

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
      // Verificar si el usuario está vacío
      if (usuarioId.trim() === "") {
        setError("El nombre de usuario es requerido");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      // Verificar si el usuario ya está en la lista de invitados
      if (receta.usuariosInvitados.includes(usuarioId)) {
        setError("El usuario ya está en la lista de invitados");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      // Verificar si el usuario existe en la base de datos
      const response = await fetch(`http://localhost:3333/api/usuarios/${usuarioId}`);
      if (!response.ok) {
        throw new Error("El usuario no existe");
      }

      // Lógica para invitar al usuario
      const responseInvitar = await fetch(`http://localhost:3333/api/recetas/${id}/invitar/${usuarioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!responseInvitar.ok) {
        throw new Error("Hubo un problema al invitar al usuario");
      }

      // Actualizar la receta local con el nuevo usuario invitado
      const updatedReceta = { ...receta };
      updatedReceta.usuariosInvitados.push(usuarioId);
      setReceta(updatedReceta);

      // Limpiar el input después de invitar al usuario y establecer un temporizador para limpiar el error
      setUsuarioId("");
      setError("");
      setTimeout(() => {
        setError("");
      }, 2000); // 2000 milisegundos = 2 segundos
    } catch (error) {
      console.error(`Error al invitar usuario:`, error);
      setError(error.message);
      // Establecer un temporizador para limpiar el error después de 3 segundos
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milisegundos = 3 segundos
    }
  };

  const eliminarUsuario = async () => {
    try {
      // Verificar si el usuario está vacío
      if (usuarioId.trim() === "") {
        setError("El nombre de usuario es requerido");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      // Verificar si el usuario no está en la lista de usuarios invitados
      if (!receta.usuariosInvitados.includes(usuarioId)) {
        setError("El usuario no está en la lista de invitados");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      // Lógica para enviar la solicitud de eliminación...
      console.log("Solicitud de eliminación enviada para el usuario:", usuarioId);

      // Actualizar la receta local eliminando al usuario
      const updatedReceta = { ...receta };
      updatedReceta.usuariosInvitados = updatedReceta.usuariosInvitados.filter(usuario => usuario !== usuarioId);
      setReceta(updatedReceta);

      // Limpiar el input después de eliminar al usuario y establecer un temporizador para limpiar el error
      setUsuarioId("");
      setError("");
      setTimeout(() => {
        setError("");
      }, 2000); // 2000 milisegundos = 2 segundos
    } catch (error) {
      console.error(`Error al eliminar usuario:`, error);
      setError(error.message);
      // Establecer un temporizador para limpiar el error después de 3 segundos
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milisegundos = 3 segundos
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

          {/* Botones para invitar usuarios y eliminar usuarios, solo visibles si el usuario está autenticado */}
          {isAuthenticated && (
            <div className="contenedor-botones">
              <button onClick={invitarUsuario} className="agregar">Agregar Usuario</button>
              <button onClick={eliminarUsuario} className="eliminar">Eliminar Usuario</button>
            </div>
          )}

          {/* Mostrar mensaje de error si existe */}
          {error && <p className="error-message">{error}</p>}
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
        {receta.usuariosInvitados && receta.usuariosInvitados.length > 0 ? (
          <div className="usuarios-ayudando">
            <h3>Usuarios Ayudando</h3>
            <ul>
              {receta.usuariosInvitados.map((usuario, index) => (
                <li key={index}>
                  {usuario}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="usuarios-ayudando">
            <h3>Usuarios Ayudando</h3>
            <p>No hay usuarios ayudando</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetallesReceta;

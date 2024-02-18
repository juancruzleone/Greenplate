import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../styles/perfil.css';

const PerfilUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    console.log('Valor de id:', id);
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error('Token no encontrado. Usuario no autenticado.');
          return;
        }

        console.log('Haciendo solicitud para obtener perfil con token:', token);

        const response = await fetch(`http://localhost:3333/api/perfil/${id}`, {
          headers: {
            'auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el perfil del usuario');
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.message);
      }
    };

    obtenerUsuario();
  }, [id]);

  if (!usuario) {
    return <div>Cargando perfil del usuario...</div>;
  }

  return (
    <div>
      <h1>Perfil de {usuario.userName}</h1>
      <p className="id-perfil">ID: {id}</p>
      <div className="detalle-perfil">
        <h2 className="titulo-recetas-creadas">Recetas en las que participa {usuario.userName}</h2>
        {usuario.recetas && usuario.recetas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre de la Receta</th>
              </tr>
            </thead>
            <tbody>
              {usuario.recetas.map((receta) => (
                receta.usuariosInvitados.includes(usuario.userId) &&
                <tr key={receta._id}>
                  <td>{receta.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="participacion-vacia">No participa en ninguna receta</p>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;

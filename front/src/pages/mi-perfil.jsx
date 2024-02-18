import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../styles/perfil.css';

const PerfilUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const obtenerPerfilYRecetas = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error('Token no encontrado. Usuario no autenticado.');
          return;
        }

        // Obtener perfil del usuario
        const perfilResponse = await fetch(`http://localhost:3333/api/perfil/${id}`, {
          headers: {
            'auth-token': token,
          },
        });

        if (!perfilResponse.ok) {
          throw new Error('Error al obtener el perfil del usuario');
        }

        const perfilData = await perfilResponse.json();
        setUsuario(perfilData);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.message);
      }
    };

    obtenerPerfilYRecetas();
  }, [id]);

  useEffect(() => {
    const obtenerRecetasUsuario = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error('Token no encontrado. Usuario no autenticado.');
          return;
        }

        const recetasResponse = await fetch(`http://localhost:3333/api/perfil/${usuario.userName}/recetas`, {
          headers: {
            'auth-token': token,
          },
        });

        if (!recetasResponse.ok) {
          throw new Error('Error al obtener las recetas del usuario');
        }

        const recetasData = await recetasResponse.json();
        setRecetas(recetasData);
      } catch (error) {
        console.error('Error al obtener las recetas del usuario:', error.message);
      }
    };

    if (usuario) {
      obtenerRecetasUsuario();
    }
  }, [usuario]);

  if (!usuario) {
    return <div>Cargando perfil del usuario...</div>;
  }

  return (
    <div>
      <h1>Perfil de {usuario.userName}</h1>
      <p className="id-perfil">ID: {id}</p>
      <div className="detalle-perfil">
        <h2 className="titulo-recetas-creadas">Recetas en las que participa {usuario.userName}</h2>
        {recetas.length > 0 ? (
          <table>
            <tbody>
              {recetas.map((receta) => (
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

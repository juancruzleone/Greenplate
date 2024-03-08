import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../styles/perfil.css';

const PerfilUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [recetas, setRecetas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

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

        let url = `http://localhost:3333/api/perfil/${usuario.userName}/recetas`;

        // Si se selecciona una categoría, agregar el parámetro de categoría a la URL
        if (categoriaSeleccionada !== "todos") {
          url += `?categoria=${categoriaSeleccionada}`;
        }

        const recetasResponse = await fetch(url, {
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
  }, [usuario, categoriaSeleccionada]); // Actualizar cuando cambia la categoría seleccionada

  useEffect(() => {
    // Extraer categorías únicas de las recetas
    const categoriasUnicas = [...new Set(recetas.map(receta => receta.categoria))];
    setCategorias(categoriasUnicas);
  }, [recetas]); // Actualizar cuando cambian las recetas

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  if (!usuario) {
    return <div>Cargando perfil del usuario...</div>;
  }

  let recetasFiltradas = recetas;
  if (categoriaSeleccionada !== "todos") {
    recetasFiltradas = recetas.filter(receta => receta.categoria === categoriaSeleccionada);
  }

  return (
    <div>
      <h1>Perfil de {usuario.userName}</h1>
      <p className="id-perfil">ID: {id}</p>
      <div className="detalle-perfil">
        <h2 className="titulo-recetas-creadas">Recetas en las que participa {usuario.userName}</h2>
        <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
          <option value="todos">Todos</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
        <div className="recetas-container">
          {recetasFiltradas.length > 0 ? (
            recetasFiltradas.map((receta) => (
              <div key={receta._id} className="receta-card">
                <h3>{receta.name}</h3>
              </div>
            ))
          ) : (
            <p className="participacion-vacia">No hay recetas en esta categoría</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;

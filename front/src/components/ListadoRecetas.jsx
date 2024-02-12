import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/panel.css';

const ListaRecetas = () => {
  const [recetas, setRecetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRecetas = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/recetas");
        const data = await response.json();
        setRecetas(data);
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      }
    };

    obtenerRecetas();
  }, []);

  const eliminarReceta = async (id, event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3333/api/recetas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la receta');
      }

      const updatedRecetas = recetas.filter(receta => receta._id !== id);
      setRecetas(updatedRecetas);
      // Redirige a la página de eliminación dinámica
      navigate(`/panel/recetas/${id}/eliminar`);
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  };

  const editarReceta = (id, event) => {
    event.preventDefault();
    // Redirige a la página de edición dinámica
    navigate(`/recetas/${id}/editar`);
  };

  const crearReceta = (event) => {
    event.preventDefault();
    // Redirige a la página de creación
    navigate(`/recetas/crear`);
  };

  return (
    <div>
      <div className="contenedor-pagina">
        <h1 className="titulo-paginas-panel">Recetas</h1>
        <Link to="/panel/recetas/crear" onClick={crearReceta} className="boton-crear-receta">Crear Receta</Link>
        <div className="posicion-seccion-productos">
          <div className="contenedor-productos-panel">
            {recetas.map((receta, index) => (
              <div key={index} className="tarjeta-producto-panel">
                <h3>{receta.name}</h3>
                <p>{receta.categoria}</p>
                <div className="contenedor-boton-panel">
                <Link to={`/recetas/${receta._id}`} id="boton-ver-mas">Ver más</Link>
                <Link to={`/recetas/${receta._id}/editar`} id="boton-editar">Editar</Link>
                <Link to={`/recetas/${receta._id}/eliminar`} id="boton-eliminar">Eliminar</Link>

                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaRecetas;

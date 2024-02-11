import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/eliminar-receta.css'

const EliminarReceta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState({
    name: '',
    // Agrega más propiedades según tu modelo de datos
  });

  useEffect(() => {
    const obtenerReceta = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/recetas/${id}`);
        const data = await response.json();
        setReceta(data);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };

    obtenerReceta();
  }, [id]);

  const handleEliminarReceta = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/recetas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/panel'); // Redirige a la página de listado después de eliminar
      } else {
        console.error('Error al eliminar la receta');
      }
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  };

  return (
    <div>
      <h1>Eliminar Receta</h1>
      <p className='texto-eliminar-receta'>¿Estás seguro de que deseas eliminar la receta "{receta.name}"?</p>
      {/* Muestra más detalles de la receta según tus necesidades */}
      <div className='contenedor-boton-eliminar'>
        <button type="button" onClick={handleEliminarReceta} className="boton-eliminar-receta">
          Confirmar Eliminación
        </button>
      </div>
     
    </div>
  );
};

export default EliminarReceta;

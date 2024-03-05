import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/recetas-listado.css';

const NoGluten = () => {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerRecetasNoGluten = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/no-gluten');

        if (!response.ok) {
          throw new Error('Error al obtener recetas sin gluten');
        }

        const data = await response.json();
        setRecetas(data);
      } catch (error) {
        console.error('Error al obtener recetas sin gluten:', error);
      }
    };

    obtenerRecetasNoGluten();
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const recetasFiltradas = recetas.filter((receta) => {
    return receta.name.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <>
      <h1>Listado de recetas sin gluten</h1>
      <div className='contenedor-buscador'>
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>
      <div className='contenedor-recetas-listado'>
        {recetasFiltradas.map((receta, index) => (
          <div key={index} className='tarjeta-receta-listado'>
            <div>
              <img src={receta.img} alt={receta.img} />
            </div>
            <div>
              <h3>{receta.name}</h3>
              <p>{receta.description}</p>
              <Link to={`/recetas/${receta._id}`}>Ver más</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NoGluten;

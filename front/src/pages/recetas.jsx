import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import NavRecetas from "../components/NavRecetas";
import '../styles/recetas.css';

const ListadoRecetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerRecetas = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/recetas");
        const data = await response.json();

        const recetasFiltradas = categoriaSeleccionada
          ? data.filter((receta) => receta.categoria === categoriaSeleccionada)
          : data;

        setRecetas(recetasFiltradas);
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      }
    };

    obtenerRecetas();
  }, [categoriaSeleccionada]);

  const cambiaCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <>
      <h1>Recetas</h1>
      <div className='contenedor-seccion-recetas'>
        <div className='menu-recetas'>
          <NavRecetas cambiaCategoria={cambiaCategoria} categoriaSeleccionada={categoriaSeleccionada} />
        </div>
        <div className='contenedor-recetas'>
          {recetas.map((receta, index) => (
            <div key={index} className='tarjeta-receta'>
              <img src={receta.img} alt={receta.img} />
              <h3>{receta.name}</h3>
              <p>{receta.description}</p>
              <Link to={`/recetas/${receta._id}`}>Ver más</Link>
              {/* Agrega más detalles de la receta según tus necesidades */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListadoRecetas;

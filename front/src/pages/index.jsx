import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/home.css';

const Index = () => {
  const [recetasDestacadas, setRecetasDestacadas] = useState([]);

  useEffect(() => {
    const obtenerRecetasDestacadas = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/recetas");
        if (!response.ok) {
          throw new Error("Error al obtener recetas destacadas");
        }
        const data = await response.json();
        // Obtener solo 3 recetas aleatorias
        const recetasAleatorias = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRecetasDestacadas(recetasAleatorias);
      } catch (error) {
        console.error("Error al obtener recetas destacadas:", error);
      }
    };

    // Llamada a la función para obtener recetas destacadas
    obtenerRecetasDestacadas();
  }, []); // El segundo parámetro vacío [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <>
      <div className="contenedor-portada-home">
        <img src="logo-greenpalate2.png" alt="logo greenpalate" />
      </div>
      <section className="categorias-home">
        <h2>Categorias</h2>
        <div className="contenedor-categorias-home">
          <div className="caja-categoria-home">
            <Link to="/veganas">Veganas</Link>
          </div>
          <div className="caja-categoria-home">
            <Link to="/vegetarianas">Vegetarianas</Link>
          </div>
          <div className="caja-categoria-home">
            <Link to="/no-gluten">No gluten</Link>
          </div>
          <div className="caja-categoria-home">
            <Link to="/no-lactosa">No lactosa</Link>
          </div>
        </div>
      </section>
      <section className="destacadas-home">
        <h2>Recetas destacadas</h2>
        <div className="contenedor-recetas-destacadas">
          {recetasDestacadas.map((receta, index) => (
            <div key={index} className="caja-receta-destacada">
              <img src={receta.img} alt={receta.name} className="img-destacada"/>
              <h3>{receta.name}</h3>
              <Link to={`/recetas/${receta._id}`} id="boton-ver-mas-recetas-destacadas">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
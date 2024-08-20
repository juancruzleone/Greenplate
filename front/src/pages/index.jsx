import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PreguntasFrecuentes from "../components/PreguntasFrecuentes"
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
        <div className="contenido-portada">
          <h1>Greenplate</h1>
          <p>Explora, comparte y disfruta de recetas saludables. Únete a nuestra comunidad hoy mismo.</p>
        </div>
        <img src="saludable.webp" alt="Foto saludable portada" />
      </div>
      <Link href="#categorias">
        <img src="flecha-abajo.webp" alt="Foto de flecha para abajo" className="img-flecha"/>
      </Link>
      <section className="categorias-home" id="categorias">
        <h2>Categorias</h2>
        <div className="contenedor-categorias-home">
          <div className="caja-categoria-home">
            <Link to="/veganas">Veganas</Link>
            <img src="icono-vegano.png" alt="Icono recetas veganas" />
          </div>
          <div className="caja-categoria-home">
            <Link to="/vegetarianas">Vegetarianas</Link>
            <img src="icono-vegetarianas.png" alt="Icono recetas vegetarianas" />
          </div>
          <div className="caja-categoria-home">
            <Link to="/no-gluten">No gluten</Link>
            <img src="icono-no-gluten.png" alt="Icono recetas no gluten" />
          </div>
          <div className="caja-categoria-home">
            <Link to="/no-lactosa">No lactosa</Link>
            <img src="icono-no-lactosa.png" alt="Icono recetas no lactosa" />
          </div>
        </div>
      </section>
      <section className="contenedor-unite">
        <div className="contenido-unite">
          <h2>Unite a nuestra comunidad</h2>
          <p>Crea, edita y expone tus recetas ante todos</p>
        </div>
        <div className="img-unite">
          <img src="receta.webp" alt="Foto de receta saludable" />
        </div>
      </section>
      {/* 
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
      */}
      <section className="contenedor-preguntas-frecuentes">
        <h2>Preguntas frecuentes</h2>
        <PreguntasFrecuentes />
      </section>
    </>
  );
};

export default Index;
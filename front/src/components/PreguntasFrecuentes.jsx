import React, { useState, useEffect } from "react";
import '../styles/preguntasFrecuentes.css'

const PreguntasFrecuentes = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const preguntasRespuestas = [
    {
      pregunta: "¿Qué es GreenPalate?",
      respuesta:
        "GreenPalate es un sitio web dedicado a la cocina saludable y sostenible. Proporciona a los usuarios la capacidad de crear, descubrir, editar y eliminar recetas, además de formar parte de una comunidad activa de amantes de la buena comida.",
    },
    {
      pregunta: "¿Qué funciones puedo realizar en GreenPalate?",
      respuesta:
        "En GreenPalate, puedes registrarte e iniciar sesión para acceder a todas las funciones. Una vez dentro, puedes crear tus propias recetas, editarlas según tus preferencias, eliminarlas si lo deseas y explorar las creaciones de otros usuarios. Además, puedes interactuar con la comunidad compartiendo tus experiencias culinarias y descubriendo nuevas ideas.",
    },
    {
      pregunta: "¿Cómo puedo contribuir a la comunidad de GreenPalate?",
      respuesta:
        "¡Es fácil! Simplemente registrándote y compartiendo tus recetas favoritas. También puedes comentar en las recetas de otros usuarios, darles tu opinión y compartir tus propias variaciones. ¡La comunidad de GreenPalate está deseando conocer tus creaciones!",
    },
    {
      pregunta: "¿Qué tipo de recetas puedo encontrar en GreenPalate?",
      respuesta:
        "GreenPalate ofrece una amplia variedad de recetas, desde platos principales hasta postres, todos centrados en ingredientes saludables y sostenibles. Encontrarás opciones para todas las dietas y preferencias alimenticias, desde veganas y vegetarianas hasta opciones sin gluten y más.",
    },
    {
      pregunta: "¿Ofrece GreenPalate soporte técnico y ayuda?",
      respuesta:
        "Sí, en GreenPalate nos preocupamos por la experiencia de nuestros usuarios. Ofrecemos soporte técnico para resolver cualquier problema que puedas encontrar, así como ayuda y consejos para sacar el máximo partido a la plataforma y a tus creaciones culinarias.",
    },
  ];

  const handleClick = (index) => {
    if (preguntaAbierta === index) {
      setPreguntaAbierta(null);
    } else {
      setPreguntaAbierta(index);
    }
  };

  useEffect(() => {
    const toggleButtons = document.querySelectorAll(".toggleButton");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const preguntaFrecuente = button.parentElement;
        const respuesta = preguntaFrecuente.querySelector(".respuesta");

        preguntaFrecuente.classList.toggle("active");
        respuesta.classList.toggle("show");
        button.textContent = respuesta.classList.contains("show") ? "-" : "+";

        if (respuesta.classList.contains("show")) {
          preguntaFrecuente.style.height = preguntaFrecuente.scrollHeight + "px";
        } else {
          preguntaFrecuente.style.height = null;
        }
      });
    });
  }, []);

  return (
    <>
      <div className="posicionPreguntasFrecuentes">
        {preguntasRespuestas.map((item, index) => (
          <div
            className={`contenedorPreguntaRespuesta ${
              preguntaAbierta === index ? "respuestaAbierta" : ""
            }`}
            key={index}
            style={{
              marginBottom: preguntaAbierta === index ? "20px" : "0",
              height: preguntaAbierta === index ? "auto" : "60px",
            }}
          >
            <button
              className="toggleButton"
              onClick={() => handleClick(index)}
            >
              {preguntaAbierta === index ? "-" : "+"}
            </button>
            <h3 className="titulosPreguntas">{item.pregunta}</h3>
            <div
              className={`respuesta ${
                preguntaAbierta === index ? "respuestaVisible" : ""
              } show`}
            >
              <p className="respuestasPreguntas">{item.respuesta}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreguntasFrecuentes;

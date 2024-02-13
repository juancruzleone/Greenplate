// components/ListaContactos.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import '../styles/panel.css'

const ListadoContactos = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al backend cuando el componente se monta
    const obtenerContactos = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/contactos");
        const data = await response.json();

        setContactos(data);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    };

    obtenerContactos();
  }, []); // Se ejecuta solo cuando el componente se monta

  return (
    <div>
      <div className="contenedor-pagina">
        <h1 className="titulo-paginas-panel">Contactos</h1>
        <div className="posicion-seccion-productos">
          <div className="contenedor-productos-panel">
            {contactos.map((contacto, index) => (
              <div key={index} className="tarjeta-producto-panel">
                <div className="detalle-contacto">
                  <h3>{contacto.name}</h3>
                  <p><span>Email:</span> {contacto.email}</p>
                  <p><span>Mensaje:</span> {contacto.message}</p>

                </div>
                
                {/* Puedes agregar más detalles del contacto según tus necesidades */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoContactos;

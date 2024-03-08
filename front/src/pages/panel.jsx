// panel.jsx
import React, { useState } from "react";
import NavPanel from '../components/NavPanel';
import ListaRecetas from '../components/ListadoRecetas';
import ListaContactos from '../components/ListadoContactos'; // Asegúrate de importar correctamente el componente
import '../styles/panel.css'

const PanelAdmin = () => {
  const [solapaActiva, setSolapaActiva] = useState("recetas");

  const handleSolapaClick = (solapa) => {
    setSolapaActiva(solapa);
  };

  const renderContenidoPanel = () => {
    switch (solapaActiva) {
      case "recetas":
        return <ListaRecetas />;
      case "contactos":
        return <ListaContactos />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Panel admin</h1>
      <div className="contenedor-panel-admin">
        <div>
          <NavPanel onSolapaClick={handleSolapaClick} solapaActiva={solapaActiva} />
        </div>
        <div className='contenedor-contenido-panel'>
          {renderContenidoPanel()}
        </div>
      </div>
    </>
  );
}

export default PanelAdmin;

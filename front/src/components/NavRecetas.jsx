import { Link } from "react-router-dom";

const NavRecetas = ({ cambiaCategoria, categoriaSeleccionada }) => {
  return (
    <>
      <nav className="navRecetas">
        <ul>
          <li>
            <Link to="#" onClick={() => cambiaCategoria("vegana")} className={categoriaSeleccionada === "veganas" ? 'seleccionada' : ''}>
              <img src="icono-vegano.webp" alt="Iconos recetas veganas" className="icono-nav"/>
              Veganas
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => cambiaCategoria("vegetariana")} className={categoriaSeleccionada === "vegetarianas" ? 'seleccionada' : ''}>
              <img src="icono-vegetarianas.webp" alt="Icono recetas vegetarianas" className="icono-nav"/>
              Vegetarianas
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => cambiaCategoria("no gluten")} className={categoriaSeleccionada === "no gluten" ? 'seleccionada' : ''}>
              <img src="icono-no-gluten.webp" alt="Icono recetas sin gluten" className="icono-nav"/>
              Sin gluten
            </Link>
          </li>
          <li id="ultimaRecetaMenu">
            <Link to="#" onClick={() => cambiaCategoria("no lactosa")} className={categoriaSeleccionada === "no lactosa" ? 'seleccionada' : ''}>
              <img src="icono-no-lactosa.webp" alt="Icono recetas sin lactosa" className="icono-nav"/>
              Sin lactosa
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavRecetas;

import { Link } from "react-router-dom";

const NavRecetas = ({ cambiaCategoria, categoriaSeleccionada }) => {
  return (
    <>
      <nav className="navRecetas">
        <ul>
          <li>
            <Link to="#" onClick={() => cambiaCategoria("vegana")} className={categoriaSeleccionada === "veganas" ? 'seleccionada' : ''}>
              Veganas
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => cambiaCategoria("vegetariana")} className={categoriaSeleccionada === "vegetarianas" ? 'seleccionada' : ''}>
              Vegetarianas
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => cambiaCategoria("no gluten")} className={categoriaSeleccionada === "no gluten" ? 'seleccionada' : ''}>
              Sin gluten
            </Link>
          </li>
          <li id="ultimaRecetaMenu">
            <Link to="#" onClick={() => cambiaCategoria("no lactosa")} className={categoriaSeleccionada === "no lactosa" ? 'seleccionada' : ''}>
              Sin lactosa
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavRecetas;

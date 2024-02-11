import { createPage, createRecetaList } from "../pages/recetas.utils.js";
import axios from 'axios';


function createRecetaListPage(recetas) {
  let html = `
    <style>
      a {
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }
      nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
      }
      .button {
        margin-left: 10px;
      }

      .boton-crear {
        display: flex;
        justify-content: center;
        background-color: green;
        padding: 20px;
        border-radius: 10px;
        margin-top: 100px;
        color: white;
      }

      h1 {
        text-align: center;
        font-family: 'montserrat', sans-serif;
      }

      nav ul {
        display: flex;
        justify-content: center;
      }

      nav ul li a {
        text-decoration: none;
        color: white;
        margin: 10px;
      }

      .recetas-total {
        margin-top: 40px;
      }

      #editar {
        background-color: black;
        color: white;
        padding: 4px;
      }

      #eliminar {
        background-color: red;
        color: white;
        padding: 4px;
      }
    </style>

    <nav>
      <ul>
        <li><a href="/recetas">Recetas</a></li>
        <li><a href="/vegetarianas">Vegetarianas</a></li>
        <li><a href="/veganas">Veganas</a></li>
        <li><a href="/no-gluten">No gluten</a></li>
        <li><a href="/no-lactosa">No lactosa</a></li>
      </ul>
    </nav>
    <ul>`;
  html += '<h1>Lista de recetas</h1>';

  html += `
    <li>
      <a href="/recetas/nuevo" class="boton-crear">Crear Nueva Receta</a>
    </li>
    `;

  for (let i = 0; i < recetas.length; i++) {
    html += `
      <li class="recetas-total">
        <a href="/recetas/${recetas[i]._id}">${recetas[i].name}</a>
        <a href="/recetas/${recetas[i]._id}/editar" class="button" id="editar">Editar</a>
        <a href="/recetas/${recetas[i]._id}/eliminar" class="button" id="eliminar">Eliminar</a>
      </li>`;
  }

  html += `</ul>`;
  return createPage('', html);
}

function createRecetaDetallePage(receta) {
  let html = '';
  if (receta) {
    html += `<p>ID: ${receta._id}</p>`;
    html += `<p>Nombre: ${receta.name}</p>`;
    html += `<p>Descripción: ${receta.description}</p>`;
    html = createPage(`${receta.name}`, html);
  } else {
    html = createPage('Error', '<p>No se encontró la receta</p>');
  }
  return html;
}

function createRecetaFormPage(recetas) {
  let html = `
    <style>
      a {
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }
      nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
      }
      .button {
        margin-left: 10px;
      }

      .boton-crear {
        display: flex;
        justify-content: center;
        background-color: green;
        padding: 20px;
        border-radius: 10px;
        margin-top: 100px;
        color: white;
      }

      h1 {
        text-align: center;
        font-family: 'montserrat', sans-serif;
      }

      nav ul {
        display: flex;
        justify-content: center;
      }

      nav ul li a {
        text-decoration: none;
        color: white;
        margin: 10px;
      }

      .recetas-total {
        margin-top: 40px;
      }

      #editar {
        background-color: black;
        color: white;
        padding: 4px;
      }

      #eliminar {
        background-color: red;
        color: white;
        padding: 4px;
      }
    </style>

    <nav>
      <ul>
        <li><a href="/recetas">Recetas</a></li>
        <li><a href="/vegetarianas">Vegetarianas</a></li>
        <li><a href="/veganas">Veganas</a></li>
        <li><a href="/no-gluten">No gluten</a></li>
        <li><a href="/no-lactosa">No lactosa</a></li>
      </ul>
    </nav>
    <ul>`;
  html += '<h1>Nueva receta</h1>';

  html += `
    <li>
      <a href="/recetas/nuevo" class="boton-crear">Crear Nueva Receta</a>
    </li>
    `;

    html += `
    <li>
      <h2>Crear Nueva Receta</h2>
      <form action="/vegetarianas/nuevo" method="POST">
        <label for="name">Nombre:</label>
        <input type="text" name="name" id="name" placeholder="Nombre" required>
        <br>
        <label for="img">URL de la Imagen:</label>
        <input type="text" name="img" id="img" placeholder="URL de la imagen" required>
        <br>
        <label for="description">Descripción:</label>
        <textarea name="description" id="description" placeholder="Descripción" required></textarea>
        <br>
        <label for="ingredients">Ingredientes:</label>
        <textarea name="ingredients" id="ingredients" placeholder="Ingredientes" required></textarea>
        <br>
        <label for="link">Enlace:</label>
        <input type="text" name="link" id="link" placeholder="Enlace" required>
        <br>
        <label for="categoria">Categoría:</label>
        <select name="categoria" id="categoria" required>
          <option value="vegetariana">Vegetariana</option>
          <option value="vegana">Vegana</option>
          <option value="no-gluten">No Gluten</option>
          <option value="no-lactosa">No Lactosa</option>
        </select>
        <br>
        <button type="submit">Crear</button>
      </form>
    </li>
    `;

  for (let i = 0; i < recetas.length; i++) {
    html += `
      <li class="recetas-total">
        <a href="/recetas/${recetas[i]._id}">${recetas[i].name}</a>
        <a href="/recetas/${recetas[i]._id}/editar" class="button" id="editar">Editar</a>
        <a href="/recetas/${recetas[i]._id}/eliminar" class="button" id="eliminar">Eliminar</a>
      </li>`;
  }

  html += `</ul>`;
  return createPage('', html);
}



function createPaginaError(title, errorMessage) {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${errorMessage}</p>
    </body>
    </html>
  `;

  return html;
}

function createPaginaRecetasVegetarianas(recetas) {
  let html = `
    <style>
      a {
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }
      nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
      }
      .button {
        margin-left: 10px;
      }

      .boton-crear {
        display: flex;
        justify-content: center;
        background-color: green;
        padding: 20px;
        border-radius: 10px;
        margin-top: 100px;
        color: white;
      }

      h1 {
        text-align: center;
        font-family: 'montserrat', sans-serif;
      }

      nav ul {
        display: flex;
        justify-content: center;
      }

      nav ul li a {
        text-decoration: none;
        color: white;
        margin: 10px;
      }

      .recetas-total {
        margin-top: 40px;
      }

      #editar {
        background-color: black;
        color: white;
        padding: 4px;
      }

      #eliminar {
        background-color: red;
        color: white;
        padding: 4px;
      }
    </style>

    <nav>
      <ul>
        <li><a href="/recetas">Recetas</a></li>
        <li><a href="/vegetarianas">Vegetarianas</a></li>
        <li><a href="/veganas">Veganas</a></li>
        <li><a href="/no-gluten">No gluten</a></li>
        <li><a href="/no-lactosa">No lactosa</a></li>
      </ul>
    </nav>
    <ul>`;
  html += '<h1>Recetas vegetarianas</h1>';

  html += `
    <li>
      <a href="/vegetarianas/nuevo" class="boton-crear">Crear Nueva Receta</a>
    </li>
    `;

  for (let i = 0; i < recetas.length; i++) {
    html += `
      <li class="recetas-total">
        <a href="/vegetarianas/${recetas[i]._id}">${recetas[i].name}</a>
        <a href="/vegetarianas/${recetas[i]._id}/editar" class="button" id="editar">Editar</a>
        <a href="/vegetarianas/${recetas[i]._id}/eliminar" class="button" id="eliminar">Eliminar</a>
      </li>`;
  }

  html += `</ul>`;
  return createPage('', html);
}

function createPaginaRecetasVeganas(recetas) {
  let html = `
    <style>
      a {
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }
      nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
      }
      .button {
        margin-left: 10px;
      }

      .boton-crear {
        display: flex;
        justify-content: center;
        background-color: green;
        padding: 20px;
        border-radius: 10px;
        margin-top: 100px;
        color: white;
      }

      h1 {
        text-align: center;
        font-family: 'montserrat', sans-serif;
      }

      nav ul {
        display: flex;
        justify-content: center;
      }

      nav ul li a {
        text-decoration: none;
        color: white;
        margin: 10px;
      }

      .recetas-total {
        margin-top: 40px;
      }

      #editar {
        background-color: black;
        color: white;
        padding: 4px;
      }

      #eliminar {
        background-color: red;
        color: white;
        padding: 4px;
      }
    </style>

    <nav>
      <ul>
        <li><a href="/recetas">Recetas</a></li>
        <li><a href="/vegetarianas">Vegetarianas</a></li>
        <li><a href="/veganas">Veganas</a></li>
        <li><a href="/no-gluten">No gluten</a></li>
        <li><a href="/no-lactosa">No lactosa</a></li>
      </ul>
    </nav>
    <ul>`;
  html += '<h1>Recetas veganas</h1>';

  html += `
    <li>
      <a href="/veganas/nuevo" class="boton-crear">Crear Nueva Receta</a>
    </li>
    `;

  for (let i = 0; i < recetas.length; i++) {
    html += `
      <li class="recetas-total">
        <a href="/veganas/${recetas[i]._id}">${recetas[i].name}</a>
        <a href="/veganas/${recetas[i]._id}/editar" class="button" id="editar">Editar</a>
        <a href="/veganas/${recetas[i]._id}/eliminar" onclick="eliminarReceta('${recetas[i]._id} class="button" id="eliminar">Eliminar</a>
      </li>`;
  }

  html += `</ul>`;
  return createPage('', html);
}

function createPaginaRecetasNoLactosa(recetas) {
  let html = `
    <style>
      a {
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }
      nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
      }
      .button {
        margin-left: 10px;
      }

      .boton-crear {
        display: flex;
        justify-content: center;
        background-color: green;
        padding: 20px;
        border-radius: 10px;
        margin-top: 100px;
        color: white;
      }

      h1 {
        text-align: center;
        font-family: 'montserrat', sans-serif;
      }

      nav ul {
        display: flex;
        justify-content: center;
      }

      nav ul li a {
        text-decoration: none;
        color: white;
        margin: 10px;
      }

      .recetas-total {
        margin-top: 40px;
      }

      #editar {
        background-color: black;
        color: white;
        padding: 4px;
      }

      #eliminar {
        background-color: red;
        color: white;
        padding: 4px;
      }
    </style>

    <nav>
      <ul>
        <li><a href="/recetas">Recetas</a></li>
        <li><a href="/vegetarianas">Vegetarianas</a></li>
        <li><a href="/veganas">Veganas</a></li>
        <li><a href="/no-gluten">No gluten</a></li>
        <li><a href="/no-lactosa">No lactosa</a></li>
      </ul>
    </nav>
    <ul>`;
  html += '<h1>Recetas sin lactosa</h1>';

  html += `
    <li>
      <a href="/recetas/nuevo" class="boton-crear">Crear Nueva Receta</a>
    </li>
    `;

  for (let i = 0; i < recetas.length; i++) {
    html += `
      <li class="recetas-total">
        <a href="/no-lactosa/${recetas[i]._id}">${recetas[i].name}</a>
        <a href="/no-lactosa/${recetas[i]._id}/editar" class="button" id="editar">Editar</a>
        <a href="/no-lactosa/${recetas[i]._id}/eliminar" class="button" id="eliminar">Eliminar</a>
      </li>`;
  }

  html += `</ul>`;
  return createPage('', html);
}

function createPaginaRecetasNoGluten(recetas) {
  let html = `
    <style>
      a {
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
      }
      nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
      }
      .button {
        margin-left: 10px;
      }

      .boton-crear {
        display: flex;
        justify-content: center;
        background-color: green;
        padding: 20px;
        border-radius: 10px;
        margin-top: 100px;
        color: white;
      }

      h1 {
        text-align: center;
        font-family: 'montserrat', sans-serif;
      }

      nav ul {
        display: flex;
        justify-content: center;
      }

      nav ul li a {
        text-decoration: none;
        color: white;
        margin: 10px;
      }

      .recetas-total {
        margin-top: 40px;
      }

      #editar {
        background-color: black;
        color: white;
        padding: 4px;
      }

      #eliminar {
        background-color: red;
        color: white;
        padding: 4px;
      }
    </style>

    <nav>
      <ul>
        <li><a href="/recetas">Recetas</a></li>
        <li><a href="/vegetarianas">Vegetarianas</a></li>
        <li><a href="/veganas">Veganas</a></li>
        <li><a href="/no-gluten">No gluten</a></li>
        <li><a href="/no-lactosa">No lactosa</a></li>
      </ul>
    </nav>
    <ul>`;
  html += '<h1>Recetas sin gluten</h1>';

  html += `
    <li>
      <a href="/recetas/nuevo" class="boton-crear">Crear Nueva Receta</a>
    </li>
    `;

  for (let i = 0; i < recetas.length; i++) {
    html += `
      <li class="recetas-total">
        <a href="/no-gluten/${recetas[i]._id}">${recetas[i].name}</a>
        <a href="/no-gluten/${recetas[i]._id}/editar" class="button" id="editar">Editar</a>
        <a href="/no-gluten/${recetas[i]._id}/eliminar" class="button" id="eliminar">Eliminar</a>
      </li>`;
  }

  html += `</ul>`;
  return createPage('', html);
}

function mostrarFormularioEdicion(receta) {
  return `
    <form method="POST" action="/veganas/${receta._id}/editar">
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" value="${receta.name}">
      <label for="ingredientes">Ingredientes:</label>
      <textarea name="ingredientes">${receta.ingredientes}</textarea>
      <label for="descripcion">Descripción:</label>
      <textarea name="descripcion">${receta.description}</textarea>
      <button type="submit">Guardar cambios</button>
    </form>
  `;
}


function crearFormularioEliminar(receta) {
  return `
    <form method="POST" action="/veganas/${receta._id}/eliminar">
      <p>¿Estás seguro de que deseas eliminar la receta "${receta.name}"?</p>
      <button type="submit">Eliminar</button>
    </form>
  `;
}



export {
  createPaginaRecetasNoLactosa,
  createPaginaRecetasNoGluten,
  createPaginaRecetasVeganas,
  createPaginaRecetasVegetarianas,
  createPaginaError,
  createRecetaListPage,
  createRecetaDetallePage,
  createRecetaFormPage,
  mostrarFormularioEdicion,
  crearFormularioEliminar
};
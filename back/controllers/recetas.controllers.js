import * as service from '../services/recetas.services.js';
import * as view from '../views/recetas.views.js';


// Secciones
const obtenerTodasLasRecetas = (req, res, next) => {
  const isApiRequest = req.path.startsWith('/api/'); // Verificar si es una solicitud de API

  service.obtenerRecetasPorColecciones("recetas")
    .then((recetas) => {
      if (isApiRequest) {
        res.json(recetas); // Responder con JSON para solicitudes de API
      } else {
        res.send(view.createRecetaListPage(recetas)); // Responder con HTML para solicitudes web
      }
    })
    .catch((error) => {
      if (isApiRequest) {
        res.status(500).json({ error: error.message }); // Responder con JSON en caso de error para solicitudes de API
      } else {
        res.send(view.createPaginaError('Error', `<p>${error}</p>`)); // Responder con HTML en caso de error para solicitudes web
      }
    });
};

const obtenerRecetaPorId = (req, res) => {
  const recetaId = req.params.id;
  const isApiRequest = req.path.startsWith('/api/'); // Verificar si es una solicitud de API

  service.obtenerRecetaPorId(recetaId)
    .then((receta) => {
      if (receta) {
        if (isApiRequest) {
          res.json(receta); // Responder con JSON para solicitudes de API
        } else {
          res.send(view.createRecetaDetallePage(receta)); // Responder con HTML para solicitudes web
        }
      } else {
        if (isApiRequest) {
          res.status(404).json({ error: 'No se encontró la receta' }); // Responder con JSON en caso de error para solicitudes de API
        } else {
          res.send(view.createPaginaError('Error', '<p>No se encontró la receta</p>')); // Responder con HTML en caso de error para solicitudes web
        }
      }
    })
    .catch((error) => {
      if (isApiRequest) {
        res.status(500).json({ error: error.message }); // Responder con JSON en caso de error para solicitudes de API
      } else {
        res.send(view.createPaginaError('Error', `<p>${error}</p>`)); // Responder con HTML en caso de error para solicitudes web
      }
    });
};







// Crear receta
const mostrarFormularioCrearReceta = (req, res) => {
  res.send(view.createRecetaFormPage(recetas));
};
async function crearNuevaReceta(req, res) {
  try {
    const nuevaReceta = req.body; // Asume que los datos del formulario se envían en el cuerpo de la solicitud
    const recetaCreada = await crearReceta(nuevaReceta); // Llama al servicio para crear la receta
    res.status(201).json(recetaCreada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Editar receta
const editarReceta = (req, res) => {
  const recetaId = req.params.id;
  const recetaEditada = {
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  };

  service.editarReceta(recetaId, recetaEditada)
    .then(() => {
      res.send(view.crearPaginaConfirmacion('Receta Editada', `<p>Receta ${recetaEditada.name} editada con éxito.</p>`));
    })
    .catch((error) => {
      res.send(view.createPaginaError('Error', `<p>${error}</p>`));
    });
};









const mostrarFormularioEditarReceta = (req, res) => {
  const recetaId = req.params.id;
  service.obtenerRecetaPorId(recetaId)
    .then((receta) => {
      if (receta) {
        res.send(view.crearFormularioEdicion(receta));
      } else {
        res.send(view.createPaginaError('Error', '<p>No se encontró la receta</p>'));
      }
    })
    .catch((error) => {
      res.send(view.createPaginaError('Error', `<p>${error}</p>`));
    });
};









// Eliminar receta
const mostrarFormularioEliminarReceta = (req, res) => {
  const recetaId = req.params.id;
  service.obtenerRecetaPorId(recetaId)
    .then((receta) => {
      if (receta) {
        res.send(view.crearFormularioEliminar(receta));
      } else {
        res.send(view.createPaginaError('Error', '<p>No se encontró la receta</p>'));
      }
    })
    .catch((error) => {
      res.send(view.createPaginaError('Error', `<p>${error}</p>`));
    });
};

const eliminarReceta = (req, res) => {
  const recetaId = req.params.id;

  service.eliminarReceta(recetaId)
    .then((recetaEliminada) => {
      if (recetaEliminada) {
        res.send(view.crearPaginaConfirmacion('Receta Eliminada', `<p>Receta #${recetaEliminada._id} eliminada con éxito.</p>`));
      } else {
        res.send(view.createPaginaError('Error', '<p>No se pudo eliminar la receta</p>'));
      }
    })
    .catch((error) => {
      res.send(view.createPaginaError('Error', `<p>${error}</p>`));
    });
};




// Crear
async function crearNuevaRecetaVegana(req, res) {
  try {
    const nuevaRecetaVegana = req.body; // Asume que los datos de la receta se encuentran en el cuerpo de la solicitud
    const recetaCreada = await crearRecetaVegana(nuevaRecetaVegana);
    res.status(201).json(recetaCreada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function crearNuevaRecetaVegetariana(req, res) {
  try {
    const nuevaRecetaVegetariana = req.body; // Asume que los datos de la receta se encuentran en el cuerpo de la solicitud
    const recetaCreada = await crearRecetaVegetariana(nuevaRecetaVegetariana);
    res.status(201).json(recetaCreada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function crearNuevaRecetaNoGluten(req, res) {
  try {
    const nuevaRecetaNoGluten = req.body; // Asume que los datos de la receta se encuentran en el cuerpo de la solicitud
    const recetaCreada = await crearRecetaNoGluten(nuevaRecetaNoGluten);
    res.status(201).json(recetaCreada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function crearNuevaRecetaNoLactosa(req, res) {
  try {
    const nuevaRecetaNoLactosa = req.body; // Asume que los datos de la receta se encuentran en el cuerpo de la solicitud
    const recetaCreada = await crearRecetaNoLactosa(nuevaRecetaNoLactosa);
    res.status(201).json(recetaCreada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}













export {
  // Obtener secciones
  obtenerRecetaPorId,
  obtenerTodasLasRecetas,


  // Crear
  crearNuevaReceta,






  crearNuevaRecetaVegana,
  crearNuevaRecetaVegetariana,
  crearNuevaRecetaNoGluten,
  crearNuevaRecetaNoLactosa,




  
  mostrarFormularioCrearReceta,
  mostrarFormularioEditarReceta,
  editarReceta,
 
  eliminarReceta,

  mostrarFormularioEliminarReceta,
};

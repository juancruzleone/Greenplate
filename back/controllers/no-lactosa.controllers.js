const obtenerRecetasNoLactosa = (req, res, next) => {
    const isApiRequest = req.path.startsWith('/api/'); // Verificar si es una solicitud de API
  
    service.obtenerRecetasPorColecciones("no-lactosa")
      .then((recetas) => {
        if (isApiRequest) {
          res.json(recetas); // Responder con JSON para solicitudes de API
        } else {
          res.send(view.createPaginaRecetasNoLactosa(recetas)); // Responder con HTML para solicitudes web
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

  const obtenerRecetaNoLactosaPorId = (req, res) => {
    const recetaId = req.params.id;
    const isApiRequest = req.path.startsWith('/api/'); // Verificar si es una solicitud de API
  
    service.obtenerRecetaNoLactosaPorId(recetaId)
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

  async function crearNuevaReceta(req, res) {
    try {
      const nuevaReceta = req.body; // Asume que los datos del formulario se envían en el cuerpo de la solicitud
      const recetaCreada = await crearReceta(nuevaReceta); // Llama al servicio para crear la receta
      res.status(201).json(recetaCreada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const mostrarFormularioEditarRecetaNoLactosa = (req, res) => {
    const recetaId = req.params.id;
    service.obtenerRecetaNoLactosaPorId(recetaId)
      .then((receta) => {
        if (receta) {
          res.send(view.mostrarFormularioEdicion(receta));
        } else {
          res.send(view.createPaginaError('Error', '<p>No se encontró la receta</p>'));
        }
      })
      .catch((error) => {
        res.send(view.createPaginaError('Error', `<p>${error}</p>`));
      });
  };

  const editarRecetaNoLactosa = (req, res) => {
    const recetaId = req.params.id;
    const recetaEditada = {
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    };
  
    service.editarRecetaNoLactosa(recetaId, recetaEditada)
      .then(() => {
        res.send(view.crearPaginaConfirmacion('Receta Editada', `<p>Receta ${recetaEditada.name} editada con éxito.</p>`));
      })
      .catch((error) => {
        res.send(view.createPaginaError('Error', `<p>${error}</p>`));
      });
  };
  

  const mostrarFormularioEliminarRecetaNoLactosa = (req, res) => {
    const recetaId = req.params.id;
    service.obtenerRecetaNoLactosaPorId(recetaId)
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


  
const eliminarRecetaNoLactosa = (req, res) => {
    const id = req.params.id;
    service.eliminarRecetaNoLactosa(id)
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  };
  
  
  



export{
    obtenerRecetasNoLactosa,
    obtenerRecetaNoLactosaPorId,
    mostrarFormularioCrearReceta,
    crearNuevaReceta,
    mostrarFormularioEditarRecetaNoLactosa,
    editarRecetaNoLactosa,
    mostrarFormularioEliminarRecetaNoLactosa,
    eliminarRecetaNoLactosa
}
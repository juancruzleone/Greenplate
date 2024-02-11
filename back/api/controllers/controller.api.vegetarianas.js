const obtenerRecetasVegetarianas = (req, res, next) => {
    const isApiRequest = req.path.startsWith('/api/'); // Verificar si es una solicitud de API
  
    service.obtenerRecetasPorColecciones("vegetarianas")
      .then((recetas) => {
        if (isApiRequest) {
          res.json(recetas); // Responder con JSON para solicitudes de API
        } else {
          res.send(view.createPaginaRecetasVegetarianas(recetas)); // Responder con HTML para solicitudes web
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

  const obtenerRecetaVegetarianaPorId = (req, res) => {
    const recetaId = req.params.id;
    const isApiRequest = req.path.startsWith('/api/'); // Verificar si es una solicitud de API
  
    service.obtenerRecetaVegetarianaPorId(recetaId)
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

  const mostrarFormularioEditarRecetaVegetariana = (req, res) => {
    const recetaId = req.params.id;
    service.obtenerRecetaVegetarianaPorId(recetaId)
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

  const editarRecetaVegetariana = (req, res) => {
    const recetaId = req.params.id;
    const recetaEditada = {
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    };
  
    service.editarRecetaVegetariana(recetaId, recetaEditada)
      .then(() => {
        res.send(view.crearPaginaConfirmacion('Receta Editada', `<p>Receta ${recetaEditada.name} editada con éxito.</p>`));
      })
      .catch((error) => {
        res.send(view.createPaginaError('Error', `<p>${error}</p>`));
      });
  };

  const mostrarFormularioEliminarRecetaVegetariana = (req, res) => {
    const recetaId = req.params.id;
    service.obtenerRecetaVegetarianaPorId(recetaId)
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

  const eliminarRecetaVegetariana = (req, res) => {
    const id = req.params.id;
    service.eliminarRecetaVegetariana(id)
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  };
  
  


  export{
    obtenerRecetasVegetarianas,
    obtenerRecetaVegetarianaPorId,
    mostrarFormularioCrearReceta,
    crearNuevaReceta,
    mostrarFormularioEditarRecetaVegetariana,
    editarRecetaVegetariana,
    mostrarFormularioEliminarRecetaVegetariana,
    eliminarRecetaVegetariana
  }
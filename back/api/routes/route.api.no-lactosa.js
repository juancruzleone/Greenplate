import express from 'express';
import * as recetaControllers from '../controllers/controller.api.no-lactosa.js';

const router = express.Router();

router.get('/no-lactosa', recetaControllers.obtenerRecetasNoLactosa);
router.get('/no-lactosa/:id', recetaControllers.obtenerRecetaNoLactosaPorId);
router.get('/no-lactosa/nuevo', recetaControllers.mostrarFormularioCrearReceta);
router.post('/no-lactosa/nuevo', recetaControllers.crearNuevaReceta);
router.get('/no-lactosa/:id/editar', recetaControllers.mostrarFormularioEditarRecetaNoLactosa);
router.post('/no-lactosa/:id/editar', recetaControllers.editarRecetaNoLactosa);
router.get('/no-lactosa/:id/eliminar', recetaControllers.mostrarFormularioEliminarRecetaNoLactosa);
router.post('/no-lactosa/:id/eliminar', recetaControllers.eliminarRecetaNoLactosa)

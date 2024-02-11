import express from 'express';
import * as recetaControllers from '../controllers/vegana.controllers.js';

const router = express.Router();


router.get('/veganas', recetaControllers.obtenerRecetasVeganas);
router.get('/veganas/:id', recetaControllers.obtenerRecetaVeganaPorId);
router.get('/veganas/nuevo', recetaControllers.mostrarFormularioCrearReceta);
router.post('/veganas/nuevo', recetaControllers.crearNuevaReceta);
router.get('/veganas/:id/editar', recetaControllers.mostrarFormularioEditarRecetaVegana);
router.post('/veganas/:id/editar', recetaControllers.editarRecetaVegana);
router.get('/veganas/:id/eliminar', recetaControllers.mostrarFormularioEliminarRecetaVegana);
router.post('/veganas/:id/eliminar', recetaControllers.eliminarRecetaVegana);
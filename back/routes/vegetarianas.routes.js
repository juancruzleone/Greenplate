import express from 'express';
import * as recetaControllers from '../controllers/vegetariana.controllers.js';

const router = express.Router();

router.get('/vegetarianas', recetaControllers.obtenerRecetasVegetarianas);
router.get('/vegetarianas/:id', recetaControllers.obtenerRecetaVegetarianaPorId);
router.get('/vegetarianas/nuevo', recetaControllers.mostrarFormularioCrearReceta);
router.post('/vegetarianas/nuevo', recetaControllers.crearNuevaReceta);
router.get('/vegetarianas/:id/editar', recetaControllers.mostrarFormularioEditarRecetaVegetariana);
router.post('/vegetarianas/:id/editar', recetaControllers.editarRecetaVegetariana);
router.get('/vegetarianas/:id/eliminar', recetaControllers.mostrarFormularioEliminarRecetaVegetariana);
router.post('/vegetarianas/:id/eliminar', recetaControllers.eliminarRecetaVegetariana);
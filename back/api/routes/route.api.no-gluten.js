import express from 'express';
import * as recetaControllers from '../controllers/controller.api.no-gluten.js';

const router = express.Router();


router.get('/no-gluten', recetaControllers.obtenerRecetasNoGluten);
router.get('/no-gluten/:id', recetaControllers.obtenerRecetaNoGlutenPorId);
router.get('/no-gluten/nuevo', recetaControllers.mostrarFormularioCrearReceta);
router.post('/no-gluten/nuevo', recetaControllers.crearNuevaReceta);
router.get('/no-gluten/:id/editar', recetaControllers.mostrarFormularioEditarRecetaNoGluten);
router.post('/no-gluten/:id/editar', recetaControllers.editarRecetaNoGluten);
router.get('/no-gluten/:id/eliminar', recetaControllers.mostrarFormularioEliminarRecetaNoGluten);
router.post('/no-gluten/:id/eliminar', recetaControllers.eliminarRecetaNoGluten)
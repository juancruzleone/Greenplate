import express from 'express';
import * as recetaControllers from '../controllers/recetas.controllers.js';

const router = express.Router();


router.get('/recetas', recetaControllers.obtenerTodasLasRecetas);
router.get('/recetas/:id', recetaControllers.obtenerRecetaPorId);
router.get('/recetas/nuevo', recetaControllers.mostrarFormularioCrearReceta);
router.post('/recetas/nuevo', recetaControllers.crearNuevaReceta);
router.get('/recetas/:id/editar', recetaControllers.mostrarFormularioEditarReceta);
router.post('/recetas/:id/editar', recetaControllers.editarReceta);
router.get('/recetas/:id/eliminar', recetaControllers.mostrarFormularioEliminarReceta);
router.post('/recetas/:id/eliminar', recetaControllers.eliminarReceta);
//route.get("/recetas/:id", controllers.obtenerRecetasVeganasPorId);





export default router;

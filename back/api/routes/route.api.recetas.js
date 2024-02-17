import { Router } from 'express';
import * as controllers from '../controllers/controller.api.recetas.js';
import { validateReceta, validateRecetaPatch } from '../../middleware/producto.validate.middleware.js';

const route = Router();

// Rutas para la colección general de recetas
route.get('/recetas', controllers.obtenerTodasLasRecetas);
route.post('/recetas', [validateReceta], controllers.crearReceta);
route.get('/recetas/:id', controllers.obtenerRecetaPorId);
route.put('/recetas/:id', controllers.modificarReceta);
route.put('/recetas/:id', controllers.remplazarProducto)
route.patch('/recetas/:id', controllers.actualizarReceta);
route.delete('/recetas/:id', controllers.eliminarRecetas);
route.post('/recetas/:recetaId/invitar', controllers.invitarUsuarioAReceta);


// Rutas para la categoría "veganas"
route.get('/veganas', controllers.obtenerRecetasVeganas);
route.post('/veganas', controllers.crearReceta);
route.put('/veganas/:id', controllers.modificarReceta);
route.patch('/veganas/:id', controllers.actualizarReceta);
route.delete('/veganas/eliminar/:receta_id', controllers.eliminarRecetaVegana);

// Rutas para la categoría "vegetarianas"
route.get('/vegetarianas', controllers.obtenerRecetasVegetarianas);
route.post('/vegetarianas', controllers.crearReceta);
route.put('/vegetarianas/:id', controllers.modificarReceta);
route.patch('/vegetarianas/:id', controllers.actualizarReceta);
route.delete('/vegetarianas/eliminar/:receta_id', controllers.eliminarRecetaVegetariana);

// Rutas para la categoría "no-gluten"
route.get('/no-gluten', controllers.obtenerRecetasNoGluten);
route.post('/no-gluten', controllers.crearReceta);
route.put('/no-gluten/:id', controllers.modificarReceta);
route.patch('/no-gluten/:id', controllers.actualizarReceta);
route.delete('/no-gluten/eliminar/:receta_id', controllers.eliminarRecetaNoGluten);

// Rutas para la categoría "no-lactosa"
route.get('/no-lactosa', controllers.obtenerRecetasNoLactosa);
route.post('/no-lactosa', controllers.crearReceta);
route.put('/no-lactosa/:id', controllers.modificarReceta);
route.patch('/no-lactosa/:id', controllers.actualizarReceta);
route.delete('/no-lactosa/eliminar/:producto_id', controllers.eliminarRecetaNoLactosa);

export default route;
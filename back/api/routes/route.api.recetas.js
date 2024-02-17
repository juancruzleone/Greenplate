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




export default route;

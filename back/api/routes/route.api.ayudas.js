import { Router } from 'express';
import * as controllers from '../controllers/controller.api.ayudas.js';


const route = Router();



// Invitar usuario a una receta específica por ID
route.post('/recetas/:id/invitar/:nombreUsuario', controllers.invitarUsuario);

// Eliminar usuario de una receta específica por ID
route.delete('/recetas/:id/eliminar/:nombreUsuario', controllers.eliminarUsuario);

// Obtener lista de usuarios ayudando en una receta específica por ID
route.get('/recetas/:id/usuarios-ayudando', controllers.obtenerUsuariosAyudando);

export default route;

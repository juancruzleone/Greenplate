import { Router } from 'express';
import * as controllers from '../controllers/controller.api.ayudas.js';

const route = Router();

// Invitar usuario a la receta por nombre de usuario
route.post('/recetas/:id/invitar/:nombreUsuario', controllers.invitarUsuarioPorNombre);

// Eliminar usuario de la receta
route.delete('/recetas/:id/usuarios/:nombreUsuario', controllers.eliminarUsuarioPorNombre);

// Obtener lista de usuarios ayudando
route.get('/recetas/:id/usuarios-ayudando', controllers.obtenerUsuariosAyudando);

export default route;

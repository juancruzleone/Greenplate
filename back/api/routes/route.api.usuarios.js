import express from 'express';
import * as usuariosControllers from '../controllers/controller.api.usuarios.js';

const router = express.Router();

// Ruta para obtener la lista de usuarios
router.get('/usuarios', usuariosControllers.obtenerTodosLosUsuarios);

// Otras rutas relacionadas con usuarios, por ejemplo:
// router.post('/usuarios', usuariosControllers.crearUsuario);
// router.get('/usuarios/:id', usuariosControllers.obtenerUsuarioPorId);
// router.put('/usuarios/:id', usuariosControllers.actualizarUsuario);
// router.delete('/usuarios/:id', usuariosControllers.eliminarUsuario);

export default router;

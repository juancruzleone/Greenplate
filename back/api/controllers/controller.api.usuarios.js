import * as usuariosService from '../../services/usuarios.services.js';

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Otros métodos del controlador según sea necesario

export {
  obtenerTodosLosUsuarios,
  // Otros métodos del controlador según sea necesario
};

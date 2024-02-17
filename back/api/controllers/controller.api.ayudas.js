import * as ayudaServices from "../../services/ayuda.services.js";

async function invitarUsuario(req, res) {
  try {
    await ayudaServices.invitarUsuarioPorNombre(req.params.id, req.params.nombreUsuario);
    res.status(201).json({ message: "Usuario invitado correctamente" });
  } catch (error) {
    console.error("Error en el controlador al invitar usuario:", error);
    res.status(400).json({ error: { message: error.message } });
  }
}

async function eliminarUsuario(req, res) {
  try {
    await ayudaServices.eliminarUsuarioPorNombre(req.params.id, req.params.nombreUsuario);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error en el controlador al eliminar usuario:", error);
    res.status(400).json({ error: { message: error.message } });
  }
}

async function obtenerUsuariosAyudando(req, res) {
  try {
    const usuarios = await ayudaServices.obtenerUsuariosAyudando(req.params.id);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error en el controlador al obtener usuarios ayudando:", error);
    res.status(400).json({ error: { message: error.message } });
  }
}

export { invitarUsuario, eliminarUsuario, obtenerUsuariosAyudando };

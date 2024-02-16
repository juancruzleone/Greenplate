import * as ayudaServices from "../../services/ayuda.services.js";

async function invitarUsuario(req, res) {
  try {
    await ayudaServices.invitarUsuarioPorNombre(req.params.id, req.params.nombreUsuario);
    res.status(201).json({ message: "Usuario invitado correctamente" });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
}

async function eliminarUsuario(req, res) {
  try {
    await ayudaServices.eliminarUsuarioPorNombre(req.params.id, req.params.nombreUsuario);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
}

async function obtenerUsuariosAyudando(req, res) {
  try {
    const usuarios = await ayudaServices.obtenerUsuariosAyudando(req.params.id);
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
}

export { invitarUsuario, eliminarUsuario, obtenerUsuariosAyudando };

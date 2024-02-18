import * as services from "../../services/auth.services.js";
import * as tokenService from "../../services/token.service.js";
import * as perfilService from "../../services/perfil.service.js";


async function crearCuenta(req, res) {
  return services
    .crearCuenta(req.body)
    .then(() =>
      res.status(201).json({ message: "Cuenta creada correctamente" })
    )
    .catch((err) => res.status(400).json({ error: { message: err.message } }));
}

async function login(req, res) {
  return services
    .login(req.body)
    .then(async (cuenta) => {
      return { token: await tokenService.crearToken(cuenta), cuenta };
    })
    .then((auth) => res.status(200).json(auth))
    .catch((err) => res.status(400).json({ error: { message: err.message } }));
}

async function logout(req, res) {
  const token = req.headers["auth-token"];
  return tokenService
    .removeToken(token)
    .then(() => {
      res.status(200).json({ message: "Sesion cerrada correctamente." });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

async function crearPerfil(req, res){
  return perfilService.crearPerfil(req.cuenta,req.body)
    .then( ()=> res.status(201).json({message: "Perfil creado correctamente"}))
    .catch( err => res.status(400).json({error: {message: err.message}}))
}

async function obtenerPerfil(req, res) {
  const userId = req.params.id;

  return perfilService.obtenerPerfil(userId)
      .then(perfil => {
          if (!perfil) {
              return res.status(404).json({ error: { message: 'Perfil no encontrado' } });
          }
          res.status(200).json(perfil);
      })
      .catch(err => res.status(400).json({ error: { message: err.message } }));
}


async function obtenerRecetasUsuario(req, res) {
  const userName = req.params.userName; // Cambia de req.params.id a req.params.userName

  try {
    const recetas = await perfilService.obtenerRecetasPorUsuario(userName);
    res.status(200).json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas del usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export { crearCuenta, login, logout, crearPerfil, obtenerPerfil, obtenerRecetasUsuario };

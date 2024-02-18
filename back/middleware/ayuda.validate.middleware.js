// middleware/validarUsuario.js
import invitacionUsuarioSchema from '../schemas/ayuda.schema.js';

const validarUsuarioMiddleware = (req, res, next) => {
  const { id, nombreUsuario } = req.params;

  const { error } = invitacionUsuarioSchema.validate({ id, nombreUsuario });
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }

  next();
};

export default validarUsuarioMiddleware;

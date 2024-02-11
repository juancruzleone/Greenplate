import { recetaSchemaCreate, recetaSchemaPatch } from '../schemas/receta.schema.js';

function validateReceta(req, res, next) {
  recetaSchemaCreate
    .validate(req.body, { abortEarly: false })
    .then((receta) => {
      req.body = receta;
      next();
    })
    .catch((error) => res.status(400).json({ error: 'Invalid data', details: error.errors }));
}

function validateRecetaPatch(req, res, next) {
  recetaSchemaPatch
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then((receta) => {
      req.body = receta;
      next();
    })
    .catch((error) => res.status(400).json({ error: 'Invalid data', details: error.errors }));
}

export { validateReceta, validateRecetaPatch };

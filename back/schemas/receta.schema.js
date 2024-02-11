// receta.schema.js
import yup from 'yup';

const recetaSchemaCreate = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  categoria: yup.string().nullable(), // Allow a single string or be absent
  usuariosInvitados: yup.array().of(yup.string()),
});

const recetaSchemaPatch = yup.object({
  name: yup.string(),
  description: yup.string(),
  categoria: yup.string().nullable(), // Allow a single string or be absent
});

export { recetaSchemaCreate, recetaSchemaPatch };

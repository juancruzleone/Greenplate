import * as yup from 'yup';

const recetaSchemaCreate = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  ingredientes: yup.array().of(yup.string().required()).required('Los ingredientes son obligatorios'),
  categoria: yup.string().required('La categoría es obligatoria'),
  link: yup.string().required('El link es obligatorio'),
  usuariosInvitados: yup.array().of(yup.string()),
});

const recetaSchemaPatch = yup.object({
  name: yup.string(),
  description: yup.string(),
  ingredientes: yup.array().of(yup.string()),
  categoria: yup.string(),
  link: yup.string(),
});

export { recetaSchemaCreate, recetaSchemaPatch };

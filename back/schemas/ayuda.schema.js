// schemas/ayuda.schema.js
import * as yup from 'yup';

const invitacionUsuarioSchema = yup.object().shape({
  id: yup.string().required(),
  nombreUsuario: yup.string().required()
});

export default invitacionUsuarioSchema;

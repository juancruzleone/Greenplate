// contacto.validate.middleware.js
import * as yup from 'yup';

const contactSchema = yup.object().shape({
  // Define las validaciones para los campos del contacto
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("El correo electrónico debe ser válido").required("El correo electrónico es obligatorio"),
  message: yup.string().required("El mensaje es obligatorio"),
});

const validateContact = async (req, res, next) => {
  const { body } = req;

  try {
    await contactSchema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

export { validateContact };

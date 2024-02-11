// service.validate.middleware.js
import * as yup from 'yup';

const validateService = async (req, res, next) => {
  try {
    const commonSchema = yup.object().shape({
      nombre: yup.string().required('El nombre es obligatorio'),
      email: yup.string().email('Introduce un email válido').required('El email es obligatorio'),
      telefono: yup.string().required('El teléfono es obligatorio'),
      direccion: yup.string().required('La dirección es obligatoria'),
      fecha: yup.date().required('La fecha es obligatoria'),
      category: yup.string().required('La categoría es obligatoria'),
    });

    // Validar la solicitud contra el esquema común
    await commonSchema.validate(req.body, { abortEarly: false });

    // Validar la categoría específica
    const categorySchema = yup.string().oneOf(['mantenimiento', 'tecnico', 'instalaciones', 'provisiones']).required();
    await categorySchema.validate(req.body.category);

    // Validar el campo específico para el servicio de provisiones
    if (req.body.category === 'provisiones') {
      const provisionSchema = yup.object().shape({
        dispositivo: yup.string().required("Selecciona un dispositivo"),
        cantidad: yup.number().positive("La cantidad debe ser mayor que cero y es obligatoria").required("La cantidad es obligatoria"),
      });

      await provisionSchema.validate(req.body, { abortEarly: false });
    }

    // Llamar a la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    // Capturar errores de validación
    return res.status(400).json({ error: error.message });
  }
};

export { validateService };

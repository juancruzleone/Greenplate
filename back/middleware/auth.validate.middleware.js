import * as cuentaSchema from '../schemas/auth.schema.js';
import * as perfilSchema from '../schemas/perfil.schema.js';


async function validarCuenta(req, res, next) {
    try {
        // Verificar que el campo userName esté presente
        if (!req.body.userName) {
            throw new Error('El nombre de usuario es obligatorio');
        }

        // Validar el esquema usando Yup
        const cuenta = await cuentaSchema.cuenta.validate(req.body, { abortEarly: false, stripUnknown: true });
        req.body = cuenta;
        next();
    } catch (err) {
        res.status(400).json({ error: { message: 'Validation error', details: err.message } });
    }
}


async function validatePerfil(req, res, next){
    console.log(req.body)
    return perfilSchema.perfil.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (cuenta) => {
            req.body = cuenta
            next()
        } )
        .catch( (err) => res.status(400).json({ error: { message: err.message } }) )
}

export { validarCuenta, validatePerfil };

// token.validate.middleware.js
import * as tokenService from '../services/token.service.js';

async function validateToken(req, res, next) {
    const token = req.headers["auth-token"];
    console.log("Token recibido:", token); // Agregar esta línea para imprimir el token
    if (!token) {
        return res.status(401).json({ error: { message: "No se envió el token" } });
    }

    const cuenta = await tokenService.validarToken(token);

    if (!cuenta) {
        return res.status(401).json({ error: { message: "Token inválido" } });
    }

    req.cuenta = cuenta;

    next();
}

export { validateToken };

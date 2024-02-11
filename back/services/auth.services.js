// auth.services.js

import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

const client = new MongoClient("mongodb+srv://juan:Juanchocruz1234@recetas.uc27w62.mongodb.net/");
const db = client.db("AH20232CP1");
const cuentaCollention = db.collection("cuentas");
const perfilCollection = db.collection("perfiles");

async function crearCuenta(cuenta) {
    await client.connect();

    const existe = await cuentaCollention.findOne({ userName: cuenta.userName });

    if (existe) {
        throw new Error("Cuenta ya existe");
    }

    const nuevaCuenta = { ...cuenta };
    nuevaCuenta.password = await bcrypt.hash(cuenta.password, 10);

    const result = await cuentaCollention.insertOne(nuevaCuenta);

    // Crea el perfil asociado al usuario
    const nuevoPerfil = await crearPerfil(result.insertedId, cuenta.userName /* Otros campos del perfil */);

    return { cuenta: nuevaCuenta, perfil: nuevoPerfil };
}

async function login(cuenta) {
    await client.connect();

    const existe = await cuentaCollention.findOne({ userName: cuenta.userName });

    if (!existe) {
        throw new Error("No se pudo iniciar sesión");
    }

    const esValido = await bcrypt.compare(cuenta.password, existe.password);

    if (!esValido) {
        throw new Error("No se pudo iniciar sesión");
    }

    // Recupera el perfil asociado al usuario
    const perfil = await obtenerPerfil(existe._id);

    return { cuenta: { ...existe, password: undefined }, perfil };
}

async function crearPerfil(userId, userName, /* Otros campos del perfil */) {
    const nuevoPerfil = { userId, userName, /* Otros campos del perfil */ };
    const result = await perfilCollection.insertOne(nuevoPerfil);
    return { perfilId: result.insertedId, ...nuevoPerfil };
}

async function obtenerPerfil(userId) {
    try {
        return await perfilCollection.findOne({ userId });
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        throw new Error("No se pudo obtener el perfil");
    }
}


export {
    crearCuenta,
    login,
    crearPerfil,
    obtenerPerfil
};

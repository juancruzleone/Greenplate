// services/perfil.service.js

import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://juan:Juanchocruz1234@recetas.uc27w62.mongodb.net/");
const db = client.db("AH20232CP1");
const cuentaCollection = db.collection("perfiles");
const recetasCollection = db.collection("recetas");

async function crearPerfil(cuenta, perfil) {
  try {
    const perfilCompleto = {
      ...perfil,
      userName: cuenta.userName,
      _id: new ObjectId(cuenta._id)
    };
    
    await client.connect();
    
    const existe = await cuentaCollection.findOne({ userName: cuenta.userName });
    if (existe) {
      throw new Error("Ya existe un perfil");
    }

    await cuentaCollection.insertOne(perfilCompleto);
  } catch (error) {
    throw new Error("Error al crear el perfil: " + error.message);
  }
}

async function obtenerPerfil(id) {
  try {
    await client.connect();
    
    const perfil = await cuentaCollection.findOne({ _id: new ObjectId(id) });
    if (!perfil) {
      throw new Error("No existe el perfil");
    }
    
    return perfil;
  } catch (error) {
    throw new Error("Error al obtener el perfil: " + error.message);
  }
}

async function obtenerRecetasPorUsuario(userId) {
  try {
    await client.connect();
    
    const recetas = await recetasCollection.find({ usuariosInvitados: userId }).toArray();
    
    return recetas;
  } catch (error) {
    throw new Error('Error al obtener las recetas del usuario: ' + error.message);
  }
}

export {
  crearPerfil,
  obtenerPerfil,
  obtenerRecetasPorUsuario
};

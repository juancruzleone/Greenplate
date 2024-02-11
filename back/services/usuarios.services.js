import { getDB } from '../db.js';

const obtenerTodosLosUsuarios = async () => {
  try {
    const db = await getDB(); // Asegúrate de esperar a que se resuelva la promesa
    const usuarios = await db.collection('perfiles').find().toArray();
    return usuarios;
  } catch (error) {
    throw error;
  }
};

// Otros métodos del servicio según sea necesario

export {
  obtenerTodosLosUsuarios,
  // Otros métodos del servicio según sea necesario
};

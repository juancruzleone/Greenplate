import { readFile, writeFile } from "node:fs/promises";
import { MongoClient, ObjectId } from "mongodb";
import { getDB } from '../db.js';

const client = new MongoClient("mongodb+srv://juan:Juanchocruz1234@recetas.uc27w62.mongodb.net/"); 
const db = client.db("AH20232CP1");

const recetasFilePath = "./data/recetas.json";

async function obtenerTodasLasRecetas() {
  try {
    const data = await readFile(recetasFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function guardarRecetas(recetas) {
  try {
    await writeFile(recetasFilePath, JSON.stringify(recetas, null, 2), "utf8");
  } catch (error) {
    throw error;
  }
}

const obtenerRecetaPorId = async (id) => {
  return db.collection("recetas").findOne({ _id: new ObjectId(id) });
};

async function obtenerRecetaVeganaPorId(id) {
  return db.collection("veganas").findOne({ _id: new ObjectId(id) });
}

async function obtenerRecetaVegetarianaPorId(id) {
  return db.collection("vegetarianas").findOne({ _id: new ObjectId(id) });
}

async function obtenerRecetaNoGlutenPorId(id) {
  return db.collection("no-gluten").findOne({ _id: new ObjectId(id) });
}

async function obtenerRecetaNoLactosaPorId(id) {
  return db.collection("no-lactosa").findOne({ _id: new ObjectId(id) });
}

const crearRecetaVegana = async (recetaVegana) => {
  const receta = await db.collection("veganas").insertOne(recetaVegana);
  recetaVegana._id = receta.insertedId;

  return recetaVegana;
};

const crearRecetaVegetariana = async (recetaVegetariana) => {
  const receta = await db.collection("vegetarianas").insertOne(recetaVegetariana);
  recetaVegetariana._id = receta.insertedId;

  return recetaVegetariana;
};

const crearRecetaNoGluten = async (recetaNoGluten) => {
  const receta = await db.collection("no-gluten").insertOne(recetaNoGluten);
  recetaNoGluten._id = receta.insertedId;

  return recetaNoGluten;
};

const crearRecetaNoLactosa = async (recetaNoLactosa) => {
  const receta = await db.collection("no-lactosa").insertOne(recetaNoLactosa);
  recetaNoLactosa._id = receta.insertedId;

  return recetaNoLactosa;
};

const modificarReceta = async (id, receta) => {
  try {
    const db = await getDB(); // Asegúrate de esperar a que se resuelva la promesa
    const collection = db.collection('recetas');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: receta }
    );

    if (result.modifiedCount > 0) {
      const recetaModificada = await collection.findOne({ _id: new ObjectId(id) });
      return recetaModificada;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

async function editarRecetaVegana(id, datosActualizados) {
  const productoEditado = await db.collection("veganas").updateOne({ _id: new ObjectId(id) }, { $set: datosActualizados });
  return productoEditado;
}

async function editarRecetaVegetariana(id, datosActualizados) {
  const productoEditado = await db.collection("vegetarianas").updateOne({ _id: new ObjectId(id) }, { $set: datosActualizados });
  return productoEditado;
}

async function editarRecetaNoLactosa(id, datosActualizados) {
  const productoEditado = await db.collection("no-lactosa").updateOne({ _id: new ObjectId(id) }, { $set: datosActualizados });
  return productoEditado;
}

async function editarRecetaNoGluten(id, datosActualizados) {
  const productoEditado = await db.collection("no-gluten").updateOne({ _id: new ObjectId(id) }, { $set: datosActualizados });
  return productoEditado;
}

const eliminarRecetas = async (id) => {
  const recetaEliminada = await db.collection("recetas").deleteOne({ _id: new ObjectId(id) }); 
  return recetaEliminada;
};

const eliminarRecetaVegana = async (id) => {
  const recetaEliminada = await db.collection("veganas").deleteOne({ _id: new ObjectId(id) }); 
  return recetaEliminada;
};

const eliminarRecetaVegetariana = async (id) => {
  const recetaEliminada = await db.collection("vegetarianas").deleteOne({ _id: new ObjectId(id) }); 
  return recetaEliminada;
};

const eliminarRecetaNoGluten = async (id) => {
  const recetaEliminada = await db.collection("no-gluten").deleteOne({ _id: new ObjectId(id) }); 
  return recetaEliminada;
};

const eliminarRecetaNoLactosa = async (id) => {
  const recetaEliminada = await db.collection("no-lactosa").deleteOne({ _id: new ObjectId(id) }); 
  return recetaEliminada;
};

const eliminarRecetaPorId = async (id, coleccion) => {
  try {
    const result = await db.collection(coleccion).deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

async function obtenerRecetasVeganas() {
  try {
    const data = await readFile(recetasFilePath, "utf8");
    const recetas = JSON.parse(data);
    const recetasVeganas = recetas.filter((receta) => receta.categoria === "Vegana");
    return recetasVeganas;
  } catch (error) {
    throw error;
  }
}
async function obtenerRecetasVegetarianas() {
  try {
    const data = await readFile(recetasFilePath, "utf8");
    const recetas = JSON.parse(data);
    const recetasVegetarianas = recetas.filter((receta) => receta.categoria === "Vegetariana");
    return recetasVegetarianas;
  } catch (error) {
    throw error;
  }
}

async function obtenerRecetasNogluten() {
  try {
    const data = await readFile(recetasFilePath, "utf8");
    const recetas = JSON.parse(data);
    const recetasNoGluten = recetas.filter((receta) => receta.categoria === "Vegetariana");
    return recetasNoGluten;
  } catch (error) {
    throw error;
  }
}

async function obtenerRecetasPorColecciones(coleccion) {
  try {
    const recetas = await db.collection(coleccion).find().toArray();
    return recetas;
  } catch (error) {
    throw error;
  }
}

const remplazarProducto = async (id, producto) => {
  const productoEditado = await db.collection("recetas").replaceOne({ _id: new ObjectId(id) }, producto);
  return productoEditado;
};

const crearReceta = async (receta) => {
  const recetas = await db.collection("recetas").insertOne(receta);
  receta._id = recetas.insertedId;

  return receta;
};


const invitarUsuarioAReceta = async (recetaId, usuarioId, invitadorId) => {
  try {
    // Obtener la receta
    const receta = await obtenerRecetaPorId(recetaId);

    // Verificar si el usuario ya está invitado
    if (receta.usuariosInvitados.includes(usuarioId)) {
      throw new Error('El usuario ya está invitado a la receta');
    }

    // Verificar si el usuario es el creador de la receta
    if (receta.creador.toString() !== invitadorId.toString()) {
      throw new Error('No tienes permiso para invitar a usuarios a esta receta');
    }

    // Agregar el usuario a la lista de invitados
    receta.usuariosInvitados.push(usuarioId);

    // Actualizar la receta en la base de datos
    await actualizarReceta(recetaId, receta);

    return { mensaje: 'Usuario invitado exitosamente a la receta' };
  } catch (error) {
    throw error;
  }
};


export {
  invitarUsuarioAReceta,

  obtenerTodasLasRecetas,
  obtenerRecetasVeganas,
  obtenerRecetasVegetarianas,
  obtenerRecetasNogluten,
  obtenerRecetasPorColecciones,
  obtenerRecetaPorId,

  
  crearReceta,
  crearRecetaVegana,
  crearRecetaVegetariana,
  crearRecetaNoGluten,
  crearRecetaNoLactosa,

  modificarReceta,
  remplazarProducto,

  editarRecetaVegana,
  editarRecetaVegetariana,
  editarRecetaNoGluten,
  editarRecetaNoLactosa,

  eliminarRecetas,
  eliminarRecetaVegana,
  eliminarRecetaVegetariana,
  eliminarRecetaNoGluten,
  eliminarRecetaNoLactosa,
  eliminarRecetaPorId,

  obtenerRecetaVeganaPorId,
  obtenerRecetaVegetarianaPorId,
  obtenerRecetaNoGlutenPorId,
  obtenerRecetaNoLactosaPorId
};

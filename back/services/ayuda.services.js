import { getDB } from '../db.js';

// Función para invitar un usuario a ayudar en una receta
async function invitarUsuario(idReceta, datosUsuario) {
  const db = getDB();
  try {
    // Verifica si la receta existe
    const receta = await db.collection('recetas').findOne({ _id: idReceta });
    if (!receta) {
      throw new Error("La receta no existe");
    }

    // Agrega el usuario a la lista de usuarios ayudando en la receta
    await db.collection('recetas').updateOne(
      { _id: idReceta },
      { $addToSet: { usuariosAyudando: datosUsuario.userId } }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para eliminar un usuario de la lista de ayuda de una receta
async function eliminarUsuario(idReceta, idUsuario) {
  const db = getDB();
  try {
    // Verifica si la receta existe
    const receta = await db.collection('recetas').findOne({ _id: idReceta });
    if (!receta) {
      throw new Error("La receta no existe");
    }

    // Elimina al usuario de la lista de usuarios ayudando en la receta
    await db.collection('recetas').updateOne(
      { _id: idReceta },
      { $pull: { usuariosAyudando: idUsuario } }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para obtener la lista de usuarios ayudando en una receta
async function obtenerUsuariosAyudando(idReceta) {
  const db = getDB();
  try {
    // Verifica si la receta existe
    const receta = await db.collection('recetas').findOne({ _id: idReceta });
    if (!receta) {
      throw new Error("La receta no existe");
    }

    // Devuelve la lista de usuarios ayudando en la receta
    return receta.usuariosAyudando;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { invitarUsuario, eliminarUsuario, obtenerUsuariosAyudando };

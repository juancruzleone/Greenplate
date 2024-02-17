// ayuda.services.js
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://juan:Juanchocruz1234@recetas.uc27w62.mongodb.net/");
client.connect().then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const db = client.db("AH20232CP1");

// Servicio para invitar usuario a una receta por nombre de usuario
export async function invitarUsuarioPorNombre(recetaId, nombreUsuario) {
    try {
        // Verificar si el usuario existe en la colección de perfiles
        const perfil = await db.collection('perfiles').findOne({ userName: nombreUsuario });
        if (!perfil) {
            throw new Error("El usuario no existe");
        }

        const result = await db.collection('recetas').updateOne(
            { _id: new ObjectId(recetaId) },
            { $addToSet: { usuariosInvitados: nombreUsuario } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Receta no encontrada");
        }

        return { message: "Usuario invitado correctamente" };
    } catch (error) {
        console.error("Error al invitar usuario a receta:", error);
        throw error;
    }
}

// Servicio para eliminar usuario de una receta por nombre de usuario
export async function eliminarUsuarioPorNombre(recetaId, nombreUsuario) {
    try {
        const result = await db.collection('recetas').updateOne(
            { _id: new ObjectId(recetaId) },
            { $pull: { usuariosInvitados: nombreUsuario } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Receta no encontrada");
        }

        return { message: "Usuario eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar usuario de receta:", error);
        throw error;
    }
}

// Servicio para obtener lista de usuarios ayudando en una receta por ID
export async function obtenerUsuariosAyudando(recetaId) {
    try {
        const receta = await db.collection('recetas').findOne({ _id: new ObjectId(recetaId) });

        if (!receta) {
            throw new Error("Receta no encontrada");
        }

        return receta.usuariosInvitados || [];
    } catch (error) {
        console.error("Error al obtener usuarios ayudando en receta:", error);
        throw error;
    }
}

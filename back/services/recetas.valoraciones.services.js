import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb+srv://juan:Juanchocruz1234@recetas.uc27w62.mongodb.net/'); 

const db = client.db("AH20232CP1");
const valoraciones = db.collection("recetas_valoraciones");

function getValoraciones(id) {
  return valoraciones.findOne({ _id: new ObjectId(id) })
    .then((receta) => {
      return receta?.valoraciones || [];
    });
}

async function agregarValoracion(id, valoracion) {
  const update = await valoraciones.updateOne({ _id: new ObjectId(id) }, { $push: { valoraciones: valoracion } });
  if (update.matchedCount == 0) {
    await valoraciones.insertOne({ _id: new ObjectId(id), valoraciones: [valoracion] });
  }
  return update;
}

export {
  getValoraciones,
  agregarValoracion
}

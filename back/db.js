import { MongoClient } from 'mongodb';

let cachedDb = null;

export async function getDB() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient('mongodb+srv://juan:Juanchocruz1234@recetas.uc27w62.mongodb.net/');

  try {
    await client.connect();
    console.log("Conexión a MongoDB exitosa");
    const db = client.db("AH20232CP1");
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}
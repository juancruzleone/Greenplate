// controller.api.contacto.js
import { getDB } from "../../db.js";
import { contactSchema } from "../../schemas/contact.schemas.js";

// Obtén la instancia de la base de datos
const db = await getDB();

async function insertContact(contact) {
  try {
    // Validar el contacto contra el esquema
    await contactSchema.validate(contact);

    // Insertar el documento en la colección de contactos
    await db.collection("contactos").insertOne(contact);
    console.log("Contacto guardado en la base de datos");
  } catch (error) {
    console.error("Error al insertar el contacto en la base de datos:", error);
    throw error; // Puedes manejar el error de otra manera según tus necesidades
  }
}

async function getContacts() {
  try {
    const contactos = await db.collection("contactos").find().toArray();
    return contactos;
  } catch (error) {
    console.error("Error al obtener la lista de contactos:", error);
    throw error; // Puedes manejar el error de otra manera según tus necesidades
  }
}

export { insertContact, getContacts };

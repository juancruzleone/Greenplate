// contactoRoutes.js
import { Router } from 'express';
import * as controllers from '../controllers/controller.api.contacto.js';
import { validateContact } from '../../middleware/contacto.validate.middleware.js';

const route = Router();

// Agregar un contacto
route.post('/contactos', async (req, res) => {
  try {
    // Validar el contacto y manejar la lógica del controlador
    await validateContact(req, res, async () => {
      await controllers.insertContact(req.body);
      res.status(201).json({ message: "Contacto agregado correctamente" });
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener todos los contactos
route.get('/contactos', async (req, res) => {
  try {
    const contactos = await controllers.getContacts();
    res.status(200).json(contactos);
  } catch (error) {
    console.error("Error al obtener la lista de contactos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default route;

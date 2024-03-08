import React, { useState } from 'react';
import * as yup from 'yup';
import Modal from 'react-modal';
import '../styles/contacto.css';

Modal.setAppElement('#root'); // Necesario para el manejo de accesibilidad

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const contactoSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('El correo electrónico debe ser válido').required('El correo electrónico es obligatorio'),
    message: yup.string().required('El mensaje es obligatorio'),
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    // Limpiar errores al cambiar el valor de un campo
    setFormErrors({
      ...formErrors,
      [event.target.name]: '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await contactoSchema.validate(formData, { abortEarly: false });

      console.log('Enviando mensaje:', formData);

      // Envía los datos a la API
      await fetch('http://localhost:3333/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Muestra el modal de éxito
      setModalIsOpen(true);

      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Limpiar errores
      setFormErrors({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newFormErrors = {};

        // Asignar los errores al objeto newFormErrors
        error.inner.forEach((err) => {
          newFormErrors[err.path] = err.message;
        });

        // Actualizar el estado de los errores
        setFormErrors(newFormErrors);

        // Muestra el modal de errores
        setErrorModalIsOpen(true);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeErrorModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <>
      <h1>Contacto</h1>
      <div className='contenedor-contacto'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Nombre</label>
          <input type='text' id='name' name='name' value={formData.name} onChange={handleInputChange} placeholder='Escribe tu nombre'/>
          <span className='error'>{formErrors.name}</span>

          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Escribe tu email'/>
          <span className='error'>{formErrors.email}</span>

          <label htmlFor='message'>Mensaje</label>
          <textarea id='message' name='message' value={formData.message} onChange={handleInputChange} placeholder='Escribe el mensaje'></textarea>
          <span className='error'>{formErrors.message}</span>

          <button type='submit'>Enviar mensaje</button>
        </form>

  
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Mensaje Enviado Correctamente'
          className='modal'
        >
          <h2>Mensaje Enviado Correctamente</h2>
          <div className='posicion-boton-modal'>
            <a onClick={closeModal}>❌</a>
          </div>
        </Modal>

      
        <Modal
          isOpen={errorModalIsOpen}
          onRequestClose={closeErrorModal}
          contentLabel='Error al Enviar Mensaje'
          className='modal'
        >
          <h2>Error al Enviar Mensaje</h2>
          <div className='posicion-boton-modal'>
            <a onClick={closeErrorModal}>❌</a>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Contacto;

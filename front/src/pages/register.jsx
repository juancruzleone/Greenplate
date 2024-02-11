import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import '../styles/login.css';

Modal.setAppElement('#root');

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/login'); // Redirige hacia la página de inicio de sesión al cerrar el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que el usuario haya ingresado un nombre de usuario y una contraseña
    if (!usuario || !contraseña) {
      setError('Por favor, ingresa un nombre de usuario y una contraseña.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/api/cuenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: usuario, password: contraseña }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error en la solicitud: ${errorData.error.message}`);
        return;
      }

      // Registro exitoso
      console.log('Usuario registrado exitosamente');
      // Muestra el modal de éxito
      openModal();

      // Limpia los campos después de un tiempo
      setTimeout(() => {
        setUsuario('');
        setContraseña('');
        setError('');
      }, 2000);
    } catch (error) {
      setError('Error de red');
    }
  };

  return (
    <>
      <h1 className='titulo-iniciar-sesion'>Regístrate</h1>
      <div className='contenedor-login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='usuario'>Usuario</label>
          <input
            type='text'
            placeholder='Crea un usuario nuevo'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label htmlFor='contraseña'>Contraseña</label>
          <input
            type='password'
            placeholder='Crea la contraseña'
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button type='submit'>Regístrate</button>
          {error && <p className='error'>{error}</p>}
        </form>
      </div>

      {/* Modal de éxito */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Cuenta Creada Exitosamente'
        className='modal'
      >
        <div>
          <p>Cuenta creada exitosamente</p>
        </div>
      </Modal>
    </>
  );
};

export default Register;

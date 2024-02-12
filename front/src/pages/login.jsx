import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contraseña) {
      setError('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    try {
      console.log('Enviando solicitud de inicio de sesión...');
      const response = await fetch('http://localhost:3333/api/cuenta/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: usuario, password: contraseña }),
      });

      if (!response.ok) {
        console.error('Error en la solicitud:', response.status, response.statusText);
        const errorData = await response.json();

        // Manejar errores de validación específicos
        if (errorData.error.message === 'Validation error') {
          const validationErrors = errorData.error.details.map((detail) => detail.message);
          setError(validationErrors.join(', '));
        } else {
          setError(`Error en la solicitud: ${errorData.error.message}`);
        }
        return;
      }

      // Inicio de sesión exitoso, actualiza el estado de autenticación
      setIsAuthenticated(true);

      // Guardar el token en el estado global o en localStorage según tu aplicación
      const data = await response.json();
      const token = data.token;

      // Imprimir el nombre de usuario en la consola para verificar
      if (data.user && data.user.userName) {
        const username = data.user.userName;
        console.log('Usuario autenticado:', username);
      } else {
        console.error('Error: No se pudo obtener el nombre de usuario desde la respuesta del servidor.');
      }

      // Almacenar el token en localStorage
      localStorage.setItem('authToken', token);

      // Redirigir al home o al panel de administración según el estado de autenticación
      navigate(isAuthenticated ? '/panel' : '/');
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red');
    }
  };

  return (
    <>
      <h1 className='titulo-iniciar-sesion'>Inicia sesión</h1>
      <div className='contenedor-login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='usuario'>Usuario</label>
          <input
            type='text'
            placeholder='Ingresa tu usuario'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label htmlFor='contraseña'>Contraseña</label>
          <input
            type='password'
            placeholder='Ingresa tu contraseña'
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button type='submit'>Inicia sesión</button>
          {error && <p className='error'>{error}</p>}
          <p>
            Si no tienes una cuenta,{" "}
            <a href='/register' className='registroLogin'>
              regístrate
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

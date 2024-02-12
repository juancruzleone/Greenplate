import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/editar-receta.css';

const EditarReceta = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    const obtenerReceta = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/recetas/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la receta');
        }
        const data = await response.json();
        setReceta(data);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };

    obtenerReceta();
  }, [id]);

  const handleInputChange = (e) => {
    setReceta({
      ...receta,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/recetas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receta),
      });

      if (!response.ok) {
        throw new Error('Error al editar la receta');
      }

      console.log('Receta editada correctamente');
      // Redirige a la página de detalle después de editar
      window.location.href = `/panel/recetas/${id}`;
    } catch (error) {
      console.error('Error al editar la receta:', error);
    }
  };

  if (!receta) {
    return <div>Cargando detalles de la receta...</div>;
  }

  return (
    <div>
      <h1>Editar Receta</h1>
      <form className='formulario-editar-receta'>
        <label>
          Nombre:
        </label>
        <input type="text" name="name" value={receta.name} onChange={handleInputChange}/>
        <label>
          Descripción:
        </label>
        <input type="text" name="description" value={receta.description} onChange={handleInputChange} />
        <label>
          Ingredientes
        </label>
        <input type="text" name="ingredientes" value={receta.ingredientes} onChange={handleInputChange} />
        <label>
          Categoría
        </label>
        <input type="text" name="categoria" value={receta.categoria} onChange={handleInputChange} />
        <label>
          Imagen
        </label>
        <input type="text" name="img" value={receta.img} onChange={handleInputChange} />
        <label>
          Enlace
        </label>
        <input type="text" name="link" value={receta.link} onChange={handleInputChange} />
        <button type="button" onClick={handleGuardarCambios}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarReceta;

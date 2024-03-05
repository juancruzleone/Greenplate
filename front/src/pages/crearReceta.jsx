import React, { useState, useEffect } from 'react';
import '../styles/crear-receta.css';

const CrearReceta = () => {
  const [receta, setReceta] = useState({
    name: '',
    description: '',
    ingredientes: [],
    img: '',
    link: '',
    categoria: '', // Cambiar a 'categoria'
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/recetas');
        if (!response.ok) {
          throw new Error('Error al obtener las recetas');
        }
        const data = await response.json();
        const categoriasUnicas = [...new Set(data.map(receta => receta.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.name === 'categoria' ? e.target.value : e.target.value;
    setReceta({
      ...receta,
      [e.target.name]: value,
    });
  };

  const handleGuardarReceta = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/recetas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receta),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al crear la receta: ${errorMessage}`);
      }

      const nuevaReceta = await response.json();

      console.log('Receta creada correctamente:', nuevaReceta);

      // Redirige a la página de detalles después de un pequeño retardo (por ejemplo, 500 ms)
      setTimeout(() => {
        window.location.href = `/panel/recetas/${nuevaReceta._id}`;
      }, 500);
    } catch (error) {
      console.error('Error al crear la receta:', error.message);
    }
  };

  return (
    <div>
      <h1>Crear Receta</h1>
      <form className='formulario-crear-receta'>
        <label>
          Nombre:
        </label>
        <input type="text" name="name" value={receta.name} onChange={handleInputChange} placeholder='Escribe el nombre de la receta'/>
        <label>
          Descripción:
        </label>
        <input type="text" name="description" value={receta.description} onChange={handleInputChange} placeholder='Escribe la descripción de la receta'/>
        <label>
          Ingredientes:
        </label>
        <input type="text" name="ingredientes" value={receta.ingredientes} onChange={handleInputChange} placeholder="Separarlos con ,"/>
        <label>
          Categoría:
        </label>
        <select name="categoria" value={receta.categoria} onChange={handleInputChange}>
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
        <label>
          Imagen:
        </label>
        <input type="text" name="img" value={receta.img} onChange={handleInputChange} placeholder='Pega la url de la imagen'/>
        <label>
          Enlace:
        </label>
        <input type="text" name="link" value={receta.link} onChange={handleInputChange} placeholder='Pega la url de direccion'/>
        <button type="button" onClick={handleGuardarReceta}>
          Crear receta
        </button>
      </form>
    </div>
  );
};

export default CrearReceta;

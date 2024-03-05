import React, { useState, useEffect } from 'react';
import '../styles/crear-receta.css';

const CrearReceta = () => {
  const [receta, setReceta] = useState({
    name: '',
    description: '',
    ingredientes: '',
    img: '',
    categoria: '', 
  });

  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

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

  const validar = () => {
    let errores = {};
    if (!receta.name) {
      errores.name = 'El nombre de la receta es requerido';
    }
    if (!receta.description) {
      errores.description = 'La descripción de la receta es requerida';
    }
    if (!receta.ingredientes) {
      errores.ingredientes = 'Los ingredientes de la receta son requeridos';
    }
    if (!receta.categoria) {
      errores.categoria = 'La categoría de la receta es requerida';
    }
    if (!receta.img) {
      errores.img = 'La URL de la imagen es requerida';
    }
    return errores;
  };

  const handleGuardarReceta = async () => {
    const errores = validar();
    setErrores(errores);
    if (Object.keys(errores).length === 0) {
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
    } else {
      setEnviado(true);
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
        {enviado && errores.name && <p className="error">{errores.name}</p>}
        <label>
          Descripción:
        </label>
        <input type="text" name="description" value={receta.description} onChange={handleInputChange} placeholder='Escribe la descripción de la receta'/>
        {enviado && errores.description && <p className="error">{errores.description}</p>}
        <label>
          Ingredientes:
        </label>
        <input type="text" name="ingredientes" value={receta.ingredientes} onChange={handleInputChange} placeholder="Separarlos con ,"/>
        {enviado && errores.ingredientes && <p className="error">{errores.ingredientes}</p>}
        <label>
          Categoría:
        </label>
        <select name="categoria" value={receta.categoria} onChange={handleInputChange}>
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
        {enviado && errores.categoria && <p className="error">{errores.categoria}</p>}
        <label>
          Imagen:
        </label>
        <input type="text" name="img" value={receta.img} onChange={handleInputChange} placeholder='Pega la url de la imagen'/>
        {enviado && errores.img && <p className="error">{errores.img}</p>}
        <button type="button" onClick={handleGuardarReceta}>
          Crear receta
        </button>
      </form>
    </div>
  );
};

export default CrearReceta;

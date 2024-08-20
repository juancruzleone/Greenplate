import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/editar-receta.css';

const EditarReceta = () => {
  const { id } = useParams();
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
    setReceta({
      ...receta,
      [e.target.name]: e.target.value,
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

  const handleGuardarCambios = async () => {
    const errores = validar();
    setErrores(errores);
    if (Object.keys(errores).length === 0) {
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
    } else {
      setEnviado(true);
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
        {enviado && errores.name && <p className="error">{errores.name}</p>}
        <label>
          Descripción:
        </label>
        <input type="text" name="description" value={receta.description} onChange={handleInputChange} />
        {enviado && errores.description && <p className="error">{errores.description}</p>}
        <label>
          Ingredientes (Separarlos con , ):
        </label>
        <input type="text" name="ingredientes" value={receta.ingredientes} onChange={handleInputChange} placeholder="Separarlos con ,"/>
        {enviado && errores.ingredientes && <p className="error">{errores.ingredientes}</p>}
        <label>
          Categoría:
        </label>
        <select name="categoria" value={receta.categoria} onChange={handleInputChange} className='select-receta'>
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
        {enviado && errores.categoria && <p className="error">{errores.categoria}</p>}
        <label>
          Imagen:
        </label>
        <input type="text" name="img" value={receta.img} onChange={handleInputChange} />
        {enviado && errores.img && <p className="error">{errores.img}</p>}
        <button type="button" onClick={handleGuardarCambios}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarReceta;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404Page from './pages/Error404Page';
import Index from './pages/index';
import QuienesSomos from './pages/quienes-somos';
import Recetas from './pages/recetas';
import Contacto from './pages/contacto';
import Login from './pages/login';
import Register from './pages/register';
import Veganas from './pages/veganas.jsx';
import Vegetarianas from './pages/vegetarianas.jsx';
import NoGluten from './pages/no-gluten.jsx';
import NoLactosa from './pages/no-lactosa.jsx';
import DetalleReceta from './pages/detalleReceta.jsx';
import Panel from './pages/panel.jsx';
import EditarReceta from './pages/editarReceta.jsx';
import EliminarReceta from './pages/eliminarReceta.jsx';
import CrearReceta from './pages/crearReceta.jsx'
import PerfilUsuario from './pages/mi-perfil.jsx';
import Comunidad from './pages/comunidad.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './styles/index.css';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404Page />,
    children: [
      {
        path: '',
        element: <Index />,
      },
      {
        path: 'quienes-somos',
        element: <QuienesSomos />,
      },
      {
        path: 'recetas',
        element: <Recetas />,
      },
      {
        path: 'contacto',
        element: <Contacto />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'veganas',
        element: <Veganas />,
      },
      {
        path: 'vegetarianas',
        element: <Vegetarianas />,
      },
      {
        path: 'no-gluten',
        element: <NoGluten />,
      },
      {
        path: 'no-lactosa',
        element: <NoLactosa />,
      },
      {
        path: 'recetas/:id',
        element: <DetalleReceta />,
      },
      {
        path: 'panel',
        element: <PrivateRoute>
          <Panel />
        </PrivateRoute>,
        children: [
          {
            path: 'recetas/:id',
            element: <DetalleReceta />,
          },
        ],
      },
      {
        path: 'recetas/:id/editar',
        element: <PrivateRoute>
          <EditarReceta />
        </PrivateRoute>,
      },
      {
        path: 'recetas/:id/eliminar',
        element: <PrivateRoute>
          <EliminarReceta />
        </PrivateRoute>,
      },
      {
        path: 'recetas/crear',
        element: <PrivateRoute>
          <CrearReceta />
        </PrivateRoute>
      },
      {
        path: 'mi-perfil/:id',
        element: <PrivateRoute>
          <PerfilUsuario />
        </PrivateRoute>
      },
      {
        path: 'comunidad/',
        element: <PrivateRoute>
          <Comunidad />
        </PrivateRoute>
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
);

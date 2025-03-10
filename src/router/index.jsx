// src/router/index.js
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Posts from '../pages/Posts';
import PostDetail from '../pages/PostDetail'; // Nuevo componente para el detalle del post
import Nosotros from '../pages/Nosotros';
import FormularioAlumno2 from '../pages/FromularioAlumno2';
import Navbar from '../components/Navbar';
import Cursos from '../pages/Cursos';
import CursosDetail from '../pages/CursosDetail';
import Prueba from '../pages/Prueba';
import { Navigate } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />, // Layout principal con Navbar y Outlet
    children: [
      {
        index: true,
        element: <App />, // Tu página de inicio
      },
      {
        path: 'posts',
        element: <Posts />, // Lista de posts
      },
      {
        path: 'posts/:id',
        element: <PostDetail />, // Detalle del post
      },
      {
        path: 'inscripcion',
        element: <FormularioAlumno2 />,
      },
      {
        path: 'nosotros',
        element: <Nosotros />,
      },
      {
        path: 'cursos',
        element: <Cursos />,
      },
      {
        path: 'curso/:id',
        element: <CursosDetail />,
      },
      {
        path: 'prueba',
        element: <Prueba />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />, // Redirige al inicio
      }
    ],
  },

  

]);

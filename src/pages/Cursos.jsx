// src/pages/cursos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles/Cursos.module.css'


const Cursos = () => {
  const [cursos, setcursos] = useState([]);

  useEffect(() => {
    // Función para obtener la lista de cursos
    const fetchcursos = async () => {
      try {
        const response = await fetch('https://centroformacion.hopto.org/api/cursos?populate=*');
        const data = await response.json();
        setcursos(data.data);
        
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchcursos();
  }, []);

  const urlImagen = (url) => {
  console.log(url.ImagenPortada.data.attributes.url);

  return 'https://centroformacion.hopto.org' + url.ImagenPortada.data.attributes.url;
};


  return (
    <div className={`container mx-auto p-4 m-20 `} >



      <h1 className="text-4xl font-bold mb-4">Lista de cursos</h1>

      <div className={`${style.cursos}`}>

      {cursos.length === 0 ? (
        <p>Cargando cursos...</p>
      ) : (
        cursos.map((curso) => (
          
          <div
            key={curso.id}
            className="relative flex flex-col md:flex-row my-6 bg-white  border border-slate-200 rounded-lg w-full shadow-2xl p-5"
          >
            <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
              <img
                src={urlImagen(curso.attributes)}
                alt="Imagen del curso"
                className="h-full w-full rounded-md md:rounded-lg object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5   border border-transparent text-xs text-white transition-all shadow-sm w-32 text-center">
                TECNOLOGIA
              </div>
              <h4 className="mb-2 text-slate-800 text-3xl font-semibold">
                {curso.attributes.Nombre}
              </h4>
              <p className="mb-8 text-slate-600 leading-normal font-light">
                {curso.attributes.Descripcioncorta}
              </p>
              <div>
                <Link
                  to={`/curso/${curso.id}`}
                  className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
                >
                  Ver más
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default Cursos;

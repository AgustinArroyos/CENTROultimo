import { Carousel } from "flowbite-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";



const Cursada = () => {

// Estado para controlar cuándo la animación debe activarse
const sectionRef = useRef(null);
const [cursos, setcursos] = useState([]);

// Este efecto activa la animación cuando el componente es visible
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting); // Cambia el estado basado en la visibilidad
    },
    {
      root: null, // Usar el viewport como el contenedor observador
      threshold: 0.1, // Activar cuando el 10% del componente sea visible
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current); // Observa el elemento
  }

  return () => {
    if (sectionRef.current) {
      observer.unobserve(sectionRef.current); // Limpia el observer cuando el componente se desmonta
    }
  };
}, []);


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
 //console.log( 'https://centroformacion.hopto.org',url.ImagenInicio.data.attributes.url)
 
 return 'https://centroformacion.hopto.org' + url.ImagenInicio.data.attributes.url;
};





  const LeftArrow = () => (
    <div className="flex items-center justify-center p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700">
      <FaArrowLeft size={12} />
    </div>
  );

  // Crear un componente personalizado para la flecha derecha
  const RightArrow = () => (
    <div className="flex items-center justify-center p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700">
      <FaArrowRight size={12} />
    </div>
  );

  const customTheme = {

    "indicators": {
      "active": {
        "off": "bg-black/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        "on": "bg-black dark:bg-gray-800"
      },
      "base": "h-3 w-3 rounded-full",
      "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
    }

  }



  return (
    <div className=" bg-neutralSilver lg:p-16" id="cursada">
    <div className="  max-w-screen-2xl mx-auto  h-screen flex justify-between items-center">
      <Carousel leftControl={<LeftArrow />} rightControl={<RightArrow  />} theme={customTheme}  className="w-full mx-auto px-[10%]" slideInterval={6000}>
        
      {cursos.length === 0 ? (
        <p>Cargando cursos...</p>
      ) : (
        cursos.map((curso) => (
        
        <div className="flex flex-col   md:flex-row-reverse items-center justify-between gap-16">
       


            <div className=" ">
            <img src={urlImagen(curso.attributes)} alt="" className=" lg:-ml-3 "/>
            </div>
            {/* hero text */}
            <div className=" md:w-1/2">
                <h1 className="text-xl lg:text-4xl mb-4 font-semibold text-neutralDGrey w-full leading-snug ">
                {curso.attributes.Nombre}
                </h1>
                <p className="text-neutralGrey text-base mb-8 overflow-hidden text-ellipsis h-32 ">

                {curso.attributes.Descripcioncorta}

                </p>
                <p>- <span className="font-semibold">Duración:</span> 4 meses</p>
                <p>- <span className="font-semibold">Inscripciones Abiertas:</span>  17 Noviembre / 28 Marzo 2025</p>
                <div className=" flex flex-col mt-4">
                        
                        <Link 
                        to={`/inscripcion`}
                        onClick={() => sendEvent('click', 'Button', 'Inscripción', curso.id)}

                        > 
                        <div className="px-7 py-2 bg-sky-800 text-white rounded hover:bg-neutralDGrey mb-4 w-1/2 flex justify-center">
                        Inscripción
                        </div>
                        
                        </Link>

                        <Link 
                        to={`/curso/${curso.id}`}
                        onClick={() => sendEvent('click', 'Button', 'Ver más', curso.id)}

                        > 
                        <div className="px-7 py-2 bg-sky-800 text-white rounded hover:bg-neutralDGrey mb-4 w-1/2 flex justify-center">
                        Ver mas
                        </div>
                        
                        </Link>
                        
                </div>
            </div>
        </div>

))
)}       
       
   
      </Carousel>
    </div>
  </div>
  )
}

export default Cursada
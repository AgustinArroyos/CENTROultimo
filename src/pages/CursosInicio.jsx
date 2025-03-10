import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';



const Prueba = () => {
 // Estado para controlar cuándo la animación debe activarse
 const [isVisible, setIsVisible] = useState(false);
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
  console.log( 'https://centroformacion.hopto.org',url.ImagenInicio.data.attributes.url)
  
  return 'https://centroformacion.hopto.org' + url.ImagenInicio.data.attributes.url;
};



  return (
<div className='flex flex-col justify-center content-center '>
{/* animate-fade-down animate-ease-in animate-fill-forwards animate-delay-none	animate-duration-[2s] */}
    
    <div className='flex flex-col w-full justify-center content-center'>
      <h1 className=' self-center mt-10 text-3xl text-blue-900 font-semibold leading-tight  '>Prepárate para el Futuro con nuestros  <span className="underline underline-offset-3 decoration-4 decoration-black-600">Cursos Gratuitos</span> </h1>
      <p className=' self-center mt-3 text-slate-700 '>Cursos de corta duración, 100% gratuitos, con certificación oficial. Aprende habilidades en tecnología que te abrirán nuevas oportunidades laborales.</p>
    </div>


    <div 
    ref={sectionRef} // Referencia para el observer
    className={`grid grid-cols-1 content-center lg:grid-cols-3 gap-8 gap-y-20 transition-opacity duration-500  lg:p-12 ${
        isVisible ? 'animate-fade animate-once animate-duration-[2000ms] animate-ease-linear	animate-delay-none ' : 'opacity-0'}`}>

{cursos.length === 0 ? (
        <p>Cargando cursos...</p>
      ) : (
        cursos.map((curso) => (

          <div 
          key={curso.id}
         className='animate-fade-down animate-ease-in animate-fill-forwards' >
         <Link 
          to={`/curso/${curso.id}`}
          >
                      <div className='flex flex-col items-center justify-center'>

           <img
             src={urlImagen(curso.attributes)}
             alt=""
             className=" w-[50%] h-auto "
           />
          </div>
           <div className="mt-3 flex justify-between text-sm">
             <div>
               <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4 text-center">
          {curso.attributes.Nombre}
                </h3>
         
               <p className="mt-1.5 text-pretty text-xs text-gray-500 text-center">
                         {curso.attributes.Descripcioncorta}
               </p>
             </div>
         
             
           </div>
         </Link>
         </div>
        
        ))
      )}
</div>

    </div>
    
)
}

export default Prueba
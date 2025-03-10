import React from "react";
import { Carousel } from "flowbite-react";
import styles from "./styles/home.module.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import banner from '../assets/images/image1.svg';
import banner2 from '../assets/images/image2.svg';
import banner3 from '../assets/images/image3.svg';


const Home = () => {


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
    
      <div className="  bg-neutralSilver" id="home">

      <div className=" lg:px-14 max-w-screen-3xl  min-h-screen h-[80vh] flex justify-center items-center">
        <Carousel leftControl={<LeftArrow />} rightControl={<RightArrow  />} theme={customTheme} className="w-full mx-auto" slideInterval={5000} >
          <div className="my-28 md:my-8 py-12 flex flex-col w-full mx-auto md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img src={banner}  className={`${styles.home}  bg-neutralSilver`}  alt=""/>
           </div>
            {/* hero text */}
            <div className="md:w-1/2">
    <h1 className="text-5xl mb-4  font-semibold text-neutralDGrey md:w-3/4 leading-snug">
        Formación Profesional <span className="text-brandPrimary leading-snug">y Empleabilidad</span>
    </h1>
    <p className="text-neutralGrey text-base mb-8">
        Descubre cómo impulsar tu carrera con nuestros cursos especializados y asistencia en inserción laboral.
    </p>
    
</div>
          </div>
          <div className="my-28 md:my-8 py-12 flex flex-col w-full mx-auto md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img src={banner2}  className={`${styles.home}  bg-neutralSilver`}  alt=""/>
           </div>
            {/* hero text */}
            <div className="md:w-1/2">
    <h1 className="text-5xl mb-4 font-semibold text-neutralDGrey md:w-3/4 leading-snug">
        Aprende diversas habilidades <span className="text-brandPrimary leading-snug">en 4 meses</span>
    </h1>
    <p className="text-neutralGrey text-base mb-8">
        Potencia tu carrera profesional en solo cuatro meses con nuestro programa intensivo.
    </p>
   
</div>
          </div>
          <div className="my-28 md:my-8 py-12 flex flex-col w-full mx-auto md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img src={banner3}  className={`${styles.home}`}  alt=""/>
           </div>
            {/* hero text */}
            <div className="md:w-1/2">
    <h1 className="text-5xl mb-4 font-semibold text-neutralDGrey md:w-3/4 leading-snug">
        Potencia tu Emprendimiento <span className="text-brandPrimary leading-snug">sin costo</span>
    </h1>
    <p className="text-neutralGrey text-base mb-8">
        Mejora y expande tu negocio con herramientas y estrategias efectivas, totalmente gratis.
    </p>
    
</div>

          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;

import React from 'react'
import miImagen from'../assets/images/image.webp';

const Mision = () => {
  return (
    <div>
    
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
      <div className="p-8 md:p-12 h-full">
        <div className="flex flex-col justify-center space-y-9 mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right h-full">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
Nuestra misión          </h2>
    
          <p className="hidden text-gray-500 md:mt-4 md:block">
          Formar profesionales capacitados a través de programas educativos que integren la teoría, la práctica y las competencias necesarias para afrontar los retos del mundo laboral actual. Nuestro objetivo es proporcionar una educación de calidad, actualizada y relevante, que permita a nuestros estudiantes desarrollarse plenamente en sus respectivas profesiones, contribuyendo al progreso de la sociedad y las industrias en las que se desempeñan.
          </p>
    
          
        </div>
      </div>
    
      <img
        alt=""
        src={miImagen}
        className="h-[70%] w-[70%] object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
      />
    </section></div>
  )
}

export default Mision
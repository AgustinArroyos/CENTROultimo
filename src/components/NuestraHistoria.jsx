import React from 'react'
import miImagen from'../assets/images/image2.webp';

const NuestraHistoria = () => {
  return (
    <div ><section>
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-3xl w-full flex content-center">
        <h2 className="text-3xl font-bold sm:text-4xl w-full text-center ml-44 mb-12">
Nuestra historia        </h2>
      </div>
  
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
          <img
            alt=""
            src={miImagen}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
  
        <div className="lg:py-16">
          <article className="space-y-4 text-gray-600">
            <p>
            Ser un centro de formación profesional de referencia a nivel nacional, reconocido por la excelencia de nuestros programas educativos y nuestro compromiso con la innovación. 
            </p>
  
            <p>
            Aspiramos a formar líderes y expertos que impulsen el desarrollo económico y social a través de una preparación integral que les permita adaptarse y destacar en un entorno laboral en constante evolución.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default NuestraHistoria
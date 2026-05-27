import React from 'react';

// motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "../variants";

const Blog = () => {
    const faqs = [
      {
        "question": "¿Qué programas académicos ofrece el instituto?",
        "answer": "El instituto ofrece una variedad de programas académicos orientados principalmente hacia la tecnología y la informática. Actualmente contamos con: Operador de PC, Auxiliar en reparación de PC, Diseño asistido por computadora (AutoCAD), Auxiliar en instalaciones eléctricas domiciliarias, Programador web, Marketing digital, Programador, Secretario Administrativo y Auxiliar Administrativo."
      },
      
      {
        "question": "¿Cuál es el costo de inscripción para cada cursada?",
        "answer": "La inscripción y la cursada son totalmente gratis."
      },
      
      {
        "question": "¿Dónde se dictan los cursos?",
        "answer": "Nos encontramos en Posadas, Misiones. Sebastopol 3075 - sede BAPAyC."
      },
      
      {
        "question": "¿Cuál es el proceso de admisión y cuáles son los requisitos?",
        "answer": "Para inscribirse en el instituto, es necesario completar el formulario de inscripción en nuestra página web oficial. Durante el proceso, se te pedirá que subas los documentos requeridos, como una copia de tu DNI, y cualquier otra documentación relevante. Asegúrate de revisar las fechas importantes en nuestro calendario académico para no perder los plazos. Una vez que hayas completado el registro y enviado los documentos, recibirás un correo con la confirmación de tu inscripción y los siguientes pasos a seguir."
      },
      
      {
        "question": "¿Cuál es la política del instituto respecto al uso de tecnología en el aula?",
        "answer": "La política del instituto respecto al uso de tecnología en el aula incluye el uso de dispositivos electrónicos y plataformas en línea como el aula virtual en la plataforma Moodle, donde se ofrece contenido didáctico, actividades y evaluaciones."
      }
       
        
     
        
      ];
    return (
        <div  className='px-4 lg:px-14  mx-auto my-12' >
            <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            
            className='text-center md:w-1/2 mx-auto'>
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-4">
            Aprende Evoluciona Avanza

            </h2>
            <p className="text-sm text-neutralGrey mb-8 md:w-3/4 mx-auto">
            En nuestro centro, cada lección es un paso hacia adelante. Desarrolla tus habilidades con nosotros y alcanza nuevas alturas. ¡Aprende, crece y avanza con nosotros!            </p>
            </motion.div>

            {/* all blogs */}
            <motion.div 
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            
            className=' items-center justify-between mt-16'>
                     {/* Preguntas*/}
                     <div className="space-y-4">
                     {faqs.map((faq, index) => (
        <details
          key={index}
          className="group border-s-4 border-brandPrimary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">
              {faq.question}
            </h2>
            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-4 leading-relaxed text-gray-700">
            {faq.answer}
          </p>
        </details>
      ))}
  



                        </div>
                     





            </motion.div>

        </div>
    );
};

export default Blog;
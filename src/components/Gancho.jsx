import React from "react";

// motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "../variants";
import { useNavigate } from "react-router-dom";


const Gancho = () => {

const navigate = useNavigate();

  const toInscripcion = () => {
  
      navigate('/inscripcion');



  }


  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto  py-16 bg-blue-200">
      <motion.div 
    
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.6 }}
      className="flex items-center justify-center lg:w-2/5 mx-auto">
        <div className="text-center">
          <h2 className="lg:text-5xl text-3xl text-neutralBlack font-semibold mb-6 lg:leading-snug">
          ¡El futuro es tuyo! No esperes más y comienza tu formación gratuita.          </h2>
          <div className="flex gap-8 items-center justify-center">
            <button onClick={toInscripcion} className="btn-primary text-white">
            Inscríbete ya            
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gancho;

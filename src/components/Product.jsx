
import aboutImg from '../assets/images/Image4.svg';

// motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "../variants";

const Product = () => {
  return (
    <div className="my-12">
      {/* about text */}
      <div className="px-4 lg:px-14   my-12">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          >
            <img src={aboutImg} alt="" className="w-full" />
            
          </motion.div>
          <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="md:w-3/5 mx-auto">
            <h2 className="text-4xl text-blue-800 font-semibold mb-4 md:w-4/5">
            Fundamentos de Formación Profesional

</h2>
            <p className="md:w-3/4 text-sm text-neutralGrey mb-8">
            Nuestros programas educativos se basan en una educación de alta calidad que proporciona conocimientos relevantes y actualizados, fusionando la práctica, la teoría y las acciones para integrarlos plenamente. Priorizamos la relevancia de la formación profesional para ayudar a las personas a incorporarse en un campo laboral enfocado en una profesión específica.
            </p>
          </motion.div>
        </div>
      </div>

      {/* company stats */}
    
    </div>
  );
};

export default Product;

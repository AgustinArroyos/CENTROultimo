import React from 'react';

const SuccessMessage = ({ nombre, apellido, curso }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex flex-col items-center justify-center border bg-orange-200 pb-4 w-full max-w-md rounded-xl mt-2">
        
        <h2 className="text-lg font-bold mb-4 mt-5 text-center">Para la inscripción definitiva, el aspirante deberá presentar la siguiente documentación:</h2>
        
        <p className="text-base text-center">
            Acta de nacimiento

            Fotocopia del documento nacional de identidad

            Además, deberá firmar una planilla de inscripción en la institución.
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;

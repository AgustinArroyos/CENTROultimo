import React from 'react';

const SuccessMessage = ({ nombre, apellido, curso }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex flex-col items-center justify-center border bg-green-200 pb-4 w-full max-w-md rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-4 mt-5">Registro Exitoso</h2>
        <p className="text-lg text-center">
          El alumno <strong>{`${nombre} ${apellido}`}</strong> se ha inscripto correctamente en el curso <strong>{curso}</strong>.
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;

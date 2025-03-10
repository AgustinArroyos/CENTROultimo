import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

const Formulario = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  cursos, 
  errors, 
  escuelasDisponibles, 
  horariosDisponibles 
}) => {
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white/60 p-6 rounded-lg shadow-lg max-w-full md:max-w-md mx-auto">
      <InputField
        label="Correo"
        type="email"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        required
        error={errors.correo}
      />
      <InputField
        label="Apellido"
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
        error={errors.apellido}
      />
      <InputField
        label="Nombre"
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        error={errors.nombre}
      />
      <InputField
        label="DNI"
        type="text"
        name="dni"
        value={formData.dni}
        onChange={handleChange}
        required
        error={errors.dni}
      />
      <InputField
        label="Fecha de Nacimiento"
        type="date"
        name="fechaNacimiento"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        required
        error={errors.fechaNacimiento}
      />
      <SelectField
        label="Sexo"
        name="Sexo"
        value={formData.Sexo}
        onChange={handleChange}
        required
        options={[
          { value: 'true', label: 'Masculino' },
          { value: 'false', label: 'Femenino' },
        ]}
        error={errors.Sexo}
      />
      <InputField
        label="Celular"
        type="tel"
        name="Celular"
        value={formData.Celular}
        onChange={handleChange}
        required
        error={errors.Celular}
      />
      
      {/* Select de Cursos */}
      <SelectField
        label="Curso"
        name="Curso"
        value={formData.Curso}
        onChange={handleChange}
        required
        options={cursos.map((curso) => ({
          value: curso.attributes.Nombre,
          label: curso.attributes.Nombre,
        }))}
        error={errors.Curso}
      />

      {/* Select de Escuelas */}
      {escuelasDisponibles.length > 0 && (
        <SelectField
          label="Escuela"
          name="Escuela"
          value={formData.Escuela}
          onChange={handleChange}
          required
          options={escuelasDisponibles.map((escuela) => ({
            value: escuela.nombre,
            label: escuela.nombre,
          }))}
          error={errors.Escuela}
        />
      )}

      {/* Select de Horarios */}
      {formData.Escuela && horariosDisponibles.length > 0 && (
        <SelectField
          label="Horario"
          name="Horario"
          value={formData.Horario}
          onChange={handleChange}
          required
          options={horariosDisponibles.map((horario) => ({
            value: horario.id.toString(),
            label: horario.attributes.Inicio_fin,
          }))}
          error={errors.Horario}
        />
      )}
      
      {formData.Escuela && horariosDisponibles.length === 0 && (
        <div className="text-amber-700 mt-2 mb-4">
          No hay horarios disponibles para esta escuela y curso. Por favor seleccione otra escuela.
        </div>
      )}
      
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                   focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
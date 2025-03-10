
export const validateFormData = (formData) => {
    const errors = {};
  
    if (!formData.correo) {
      errors.correo = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      errors.correo = 'El correo no es válido.';
    }
  
    if (!formData.apellido) {
      errors.apellido = 'El apellido es obligatorio.';
    }
  
    if (!formData.nombre) {
      errors.nombre = 'El nombre es obligatorio.';
    }
  
    if (!formData.dni) {
      errors.dni = 'El DNI es obligatorio.';
    } else if (!/^\d+$/.test(formData.dni)) {
      errors.dni = 'El DNI debe contener solo números.';
    }
  
    // Validación de la fecha de nacimiento
  if (!formData.fechaNacimiento) {
    errors.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
  } else {
    const today = new Date();
    const birthDate = new Date(formData.fechaNacimiento);

    // Verificar que la fecha de nacimiento no sea en el futuro
    if (birthDate > today) {
      errors.fechaNacimiento = 'La fecha de nacimiento no puede ser en el futuro.';
    }

    // Verificar que el año no sea mayor a 2023 (por ejemplo)
    const maxYear = 2023;
    if (birthDate.getFullYear() > maxYear) {
      errors.fechaNacimiento = `El año de nacimiento no puede ser mayor a ${maxYear}.`;
    }

    // Verificar que la edad no supere los 120 años
    const ageDifMs = today - birthDate;
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age > 120) {
      errors.fechaNacimiento = 'La edad máxima permitida es de 120 años.';
    }
  }
  
    if (formData.Sexo === '') {
      errors.Sexo = 'El sexo es obligatorio.';
    }
  
    if (!formData.Celular) {
      errors.Celular = 'El celular es obligatorio.';
    } else if (!/^\d{10}$/.test(formData.Celular)) {
      errors.Celular = 'El celular debe tener 10 dígitos.';
    }
  
    if (!formData.Curso) {
      errors.Curso = 'El curso es obligatorio.';
    }
  
    return errors;
  };
  
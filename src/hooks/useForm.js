// src/hooks/useForm.js

import { useState } from 'react';
import { validateFormData } from '../utils/validation';

const useForm = (initialState, onSubmitCallback) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });


   
    // Si deseas validación en tiempo real, descomenta la siguiente línea
    // setErrors(validateFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmitCallback(formData);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData, // Asegúrate de incluir esto

  };
};

export default useForm;

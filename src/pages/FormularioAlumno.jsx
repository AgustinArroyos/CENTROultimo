import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InicioForm from '../components/componentsInscr/InicioForm';
import { Navigate } from 'react-router-dom';

const FormularioAlumno = () => {
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    correo: '',
    apellido: '',
    nombre: '',
    dni: '',
    fechaNacimiento: '',
    Sexo: true,
    Celular: '',
    Curso: '',
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const resetForm = () => {
    setFormData({
      correo: '',
      apellido: '',
      nombre: '',
      dni: '',
      fechaNacimiento: '',
      Sexo: true,
      Celular: '',
      Curso: '',
    });
  };



  // Recomendación: almacena el token de forma segura
  //const token = 'e9b164fc8a0f4109cfccab89e18a9b734cd5b5688b7b7c3c82042fe14b77237898e3bec780f10008939df75daff4c411228f723954704a954c36775f58a073b8c0b60f7efccfe07caf340ef94a8893215fa7e8e09a543718ab6fa2abb2578ea94ac4e37f4c28eb872794a53758ef47f47397421be83ee947f8d2872d070829db';

  useEffect(() => {
    // Obtener los cursos al montar el componente
    axios
      .get('https://centroformacion.hopto.org/api/cursos')
      .then((response) => {
        const cursosData = response.data.data; // Accedemos al arreglo de cursos
        setCursos(cursosData);
      })
      .catch((error) => {
        console.error('Error al obtener los cursos:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Para manejar el valor booleano de Sexo correctamente
    if (name === 'Sexo') {
      setFormData({ ...formData, [name]: value === 'true' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = { data: formData };
  
    axios
      .post('https://centroformacion.hopto.org/api/alumnospres', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubmittedData(formData); // Guarda los datos del formulario
        setSubmissionSuccess(true);// Indica que la sumisión fue exitosa
        resetForm() 
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
      });
  };

  return (
    <div className=' '>


<InicioForm/>

{/* <img src="src/assets/images/Banner_Horizontal_Preinscripciones.png" alt="" className='w-full object-cover h-auto relative' /> */}
 
{submissionSuccess ? (
      // Mensaje de éxito
      <div className='flex justify-center mb-4'>
      <div className='flex flex-col items-center justify-center border bg-green-200 pb-4 w-[50%] rounded-xl mt-10 '>
        <h2 className='text-2xl font-bold mb-4 mt-5'>Registro Exitoso</h2>
        <p className='text-lg text-center'>
          El alumno <strong>{submittedData.nombre} {submittedData.apellido}</strong> se ha inscripto correctamente en el curso <strong>{submittedData.Curso}</strong>.
        </p>
      
      </div>
      </div>
    ) : ('')}
 
 
    
    <form onSubmit={handleSubmit}   className=" flex flex-col justify-center items-center bg-white/60 p-4 sm:p-6 md:p-12 rounded-lg shadow-lg max-w-full md:max-w-md mx-auto h-auto"
     >
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="email"
      name="correo"
      id="correo"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={formData.correo}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="correo"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Correo
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="apellido"
      id="apellido"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={formData.apellido}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="apellido"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Apellido
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="nombre"
      id="nombre"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={formData.nombre}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="nombre"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Nombre
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="dni"
      id="dni"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={formData.dni}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="dni"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      DNI
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="date"
      name="fechaNacimiento"
      id="fechaNacimiento"
      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={formData.fechaNacimiento}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="fechaNacimiento"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Fecha de Nacimiento
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <select
      name="Sexo"
      id="Sexo"
      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      value={formData.Sexo}
      onChange={handleChange}
      required
    >
      <option value="">Seleccione una opción</option>
      <option value={true}>Masculino</option>
      <option value={false}>Femenino</option>
    </select>
    <label
      htmlFor="Sexo"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Sexo
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="tel"
      name="Celular"
      id="Celular"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={formData.Celular}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="Celular"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Celular
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <select
      name="Curso"
      id="Curso"
      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      value={formData.Curso}
      onChange={handleChange}
      required
    >
      <option value="">Seleccione un curso</option>
      {cursos.map((curso) => (
        <option key={curso.id} value={curso.attributes.Nombre}>
          {curso.attributes.Nombre}
        </option>
      ))}
    </select>
    <label
      htmlFor="Curso"
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Curso
    </label>
  </div>

  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  >
    Enviar
  </button>
</form>
</div>
  );
};

export default FormularioAlumno;

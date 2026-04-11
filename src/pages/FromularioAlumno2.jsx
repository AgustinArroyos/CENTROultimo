import React, { useState, useEffect } from 'react';
import InicioForm from '../components/componentsInscr/InicioForm';
import Formulario from '../components/componentsInscr/Formulario';
import SuccessMessage from '../components/componentsInscr/SuccessMessage';
import useFetchCursos from '../hooks/useFetchCursos';
import useForm from '../hooks/useForm';
import { postAlumno, fetchHorarios } from '../services/api';
import { initialFormData } from '../utils/formData';
import Aviso from '../components/componentsInscr/Aviso';

const FormularioAlumno = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [sinCupos, setSinCupos] = useState(false);

  const { cursos, loading, error } = useFetchCursos();

  const [selectedCurso, setSelectedCurso] = useState(null);
  const [horariosByCurso, setHorariosByCurso] = useState([]);
  const [escuelasDisponibles, setEscuelasDisponibles] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const token = import.meta.env.VITE_API_TOKEN;

  const onSubmitCallback = (formData) => {
    // Bloquear envío si no hay horarios/cupos
    if (sinCupos || horariosByCurso.length === 0) {
      setErrorMessage('No hay cupos disponibles para el curso seleccionado.');
      return;
    }

    // Bloquear envío si no eligió un horario válido
    if (!formData.Horario || horariosDisponibles.length === 0) {
      setErrorMessage('Debe seleccionar un horario disponible.');
      return;
    }

    setErrorMessage('');

    const data = { data: formData };
    console.log(data);

    postAlumno(data, token)
      .then(() => {
        setSubmittedData(formData);
        setSubmissionSuccess(true);
        setSinCupos(false);
        resetForm();
      })
      .catch(() => {
        setErrorMessage(
          'Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo.'
        );
      });
  };

  const {
    formData,
    errors,
    handleSubmit,
    resetForm,
    setFormData,
  } = useForm(initialFormData, onSubmitCallback);

  const getHorariosByCurso = async (cursoId) => {
    try {
      console.log('Obteniendo horarios para el curso ID:', cursoId);
      const response = await fetchHorarios(cursoId, token);
      console.log('Respuesta de horarios:', response);

      setHorariosByCurso(response);

      // Si no hay horarios, marcar sin cupos y limpiar selects
      if (!response || response.length === 0) {
        setSinCupos(true);
        setEscuelasDisponibles([]);
        setHorariosDisponibles([]);
        setFormData((prevData) => ({
          ...prevData,
          Escuela: '',
          Horario: '',
        }));
        return;
      }

      setSinCupos(false);

      // Extraer escuelas únicas de los horarios
      const escuelasUnicas = Array.from(
        new Set(
          response.map(
            (horario) => horario.attributes.escuela.data.attributes.Nombre
          )
        )
      ).map((nombre) => ({
        nombre,
        id: response.find(
          (h) => h.attributes.escuela.data.attributes.Nombre === nombre
        ).attributes.escuela.data.id,
      }));

      console.log('Escuelas únicas:', escuelasUnicas);
      setEscuelasDisponibles(escuelasUnicas);

      // Reiniciar los campos de Escuela y Horario
      setFormData((prevData) => ({
        ...prevData,
        Escuela: '',
        Horario: '',
      }));
    } catch (err) {
      console.error('Error al obtener horarios:', err);
      setHorariosByCurso([]);
      setEscuelasDisponibles([]);
      setHorariosDisponibles([]);
      setSinCupos(true);
      setFormData((prevData) => ({
        ...prevData,
        Escuela: '',
        Horario: '',
      }));
    }
  };

  useEffect(() => {
    if (formData.Escuela && horariosByCurso.length > 0) {
      console.log('Filtrando horarios para escuela:', formData.Escuela);

      const horariosFiltrados = horariosByCurso.filter(
        (horario) =>
          horario.attributes.escuela.data.attributes.Nombre === formData.Escuela
      );

      console.log('Horarios filtrados:', horariosFiltrados);
      setHorariosDisponibles(horariosFiltrados);
    } else {
      setHorariosDisponibles([]);
    }
  }, [formData.Escuela, horariosByCurso]);

  const customHandleChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage('');

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'Curso') {
      console.log('Curso seleccionado:', value);

      const cursoSeleccionado = cursos.find(
        (curso) => curso.attributes.Nombre === value
      );

      setSelectedCurso(cursoSeleccionado);

      if (cursoSeleccionado) {
        console.log('Curso encontrado:', cursoSeleccionado.id);
        getHorariosByCurso(cursoSeleccionado.id);
      } else {
        console.log('Curso no encontrado');
        setHorariosByCurso([]);
        setEscuelasDisponibles([]);
        setHorariosDisponibles([]);
        setSinCupos(false);
        setFormData((prevData) => ({
          ...prevData,
          Escuela: '',
          Horario: '',
        }));
      }
    }

    if (name === 'Escuela') {
      console.log('Escuela seleccionada:', value);
      setFormData((prevData) => ({
        ...prevData,
        Horario: '',
      }));
    }
  };

  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  if (error) {
    return <div>Error al cargar cursos</div>;
  }

  return (
    <div className="h-auto bg-slate-200">
      <InicioForm />

      {submissionSuccess && (
        <div>
          <SuccessMessage
            nombre={submittedData.nombre}
            apellido={submittedData.apellido}
            curso={submittedData.Curso}
          />
          <Aviso />
        </div>
      )}

      {sinCupos && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center mt-4 mx-4">
          No hay cupos disponibles para el curso seleccionado.
        </div>
      )}

      {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}

      <Formulario
        formData={formData}
        handleChange={customHandleChange}
        handleSubmit={sinCupos ? (e) => e.preventDefault() : handleSubmit}
        cursos={cursos}
        errors={errors}
        escuelasDisponibles={escuelasDisponibles}
        horariosDisponibles={horariosDisponibles}
        sinCupos={sinCupos}
      />
    </div>
  );
};

export default FormularioAlumno;
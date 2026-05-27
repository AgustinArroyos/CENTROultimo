import React, { useState } from 'react';
import './styles/Inscripcion.css';
import InicioForm from '../components/componentsInscr/InicioForm';
import PasoCursos from '../components/componentsInscr/PasoCursos';
import PasoEscuela from '../components/componentsInscr/PasoEscuela';
import PasoHorario from '../components/componentsInscr/PasoHorario';
import Formulario from '../components/componentsInscr/Formulario';
import SuccessMessage from '../components/componentsInscr/SuccessMessage';
import Aviso from '../components/componentsInscr/Aviso';
import useFetchCursos from '../hooks/useFetchCursos';
import useForm from '../hooks/useForm';
import { postPreinscripto, fetchEscuelasPorCurso, fetchCortesPorCursoYEscuela } from '../services/api';
import { initialFormData } from '../utils/formData';

const bodyStyle = {
  minHeight: '100vh',
  background: `
    radial-gradient(circle at top left, rgba(44, 123, 229, 0.22), transparent 35%),
    radial-gradient(circle at bottom right, rgba(0, 168, 107, 0.18), transparent 35%),
    linear-gradient(135deg, #eef5ff 0%, #f8fbff 50%, #eef7f1 100%)
  `,
  color: '#1f2933',
  fontFamily: 'Arial, Helvetica, sans-serif',
};

const contenedorStyle = {
  width: '94%',
  maxWidth: '820px',
  margin: '35px auto',
  background: 'rgba(255, 255, 255, 0.96)',
  padding: '30px',
  borderRadius: '26px',
  boxShadow: '0 18px 45px rgba(18, 60, 105, 0.18)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
};

const FormularioAlumno = () => {
  const [step, setStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const { cursos, loading: loadingCursos } = useFetchCursos();

  const [selectedCurso, setSelectedCurso] = useState(null);
  const [selectedEscuela, setSelectedEscuela] = useState(null);
  const [selectedCorte, setSelectedCorte] = useState(null);

  const [escuelasDisponibles, setEscuelasDisponibles] = useState([]);
  const [cortesDisponibles, setCortesDisponibles] = useState([]);
  const [loadingEscuelas, setLoadingEscuelas] = useState(false);
  const [loadingCortes, setLoadingCortes] = useState(false);

  const onSubmitCallback = (formData) => {
    setErrorMessage('');
    const payload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      dni: formData.dni,
      fechaNacimiento: formData.fechaNacimiento,
      sexo: formData.Sexo === 'true',
      correo: formData.correo,
      celular: formData.Celular,
      corteId: selectedCorte.id,
    };

    postPreinscripto(payload)
      .then(() => {
        setSubmittedData({ ...formData, cursoNombre: selectedCurso.nombre });
        setSubmissionSuccess(true);
        resetForm();
      })
      .catch(() => {
        setErrorMessage('Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo.');
      });
  };

  const { formData, errors, handleSubmit, resetForm, setFormData } = useForm(
    initialFormData,
    onSubmitCallback
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCursoSelect = async (curso) => {
    setSelectedCurso(curso);
    setSelectedEscuela(null);
    setSelectedCorte(null);
    setEscuelasDisponibles([]);
    setCortesDisponibles([]);
    setLoadingEscuelas(true);
    try {
      const escuelas = await fetchEscuelasPorCurso(curso.id);
      setEscuelasDisponibles(Array.isArray(escuelas) ? escuelas : []);
    } catch {
      setEscuelasDisponibles([]);
    } finally {
      setLoadingEscuelas(false);
      setStep(2);
    }
  };

  const handleEscuelaSelect = async (escuela) => {
    setSelectedEscuela(escuela);
    setSelectedCorte(null);
    setCortesDisponibles([]);
    setLoadingCortes(true);
    try {
      const cortes = await fetchCortesPorCursoYEscuela(selectedCurso.id, escuela.id);
      setCortesDisponibles(Array.isArray(cortes) ? cortes : []);
    } catch {
      setCortesDisponibles([]);
    } finally {
      setLoadingCortes(false);
      setStep(3);
    }
  };

  const handleCorteSelect = (corte) => {
    setSelectedCorte(corte);
    setFormData((prev) => ({
      ...prev,
      Curso: selectedCurso.nombre,
      Escuela: selectedEscuela.nombre,
      Horario: corte.id.toString(),
    }));
    setStep(4);
  };

  return (
    <div className='pt-20' style={bodyStyle}>
      <div style={contenedorStyle}>
        <InicioForm />

        {submissionSuccess ? (
          <>
            <SuccessMessage
              nombre={submittedData.nombre}
              apellido={submittedData.apellido}
              curso={submittedData.cursoNombre}
            />
            <Aviso />
          </>
        ) : (
          <>
            {step === 1 && (
              <PasoCursos
                cursos={cursos}
                loading={loadingCursos}
                onSelect={handleCursoSelect}
              />
            )}

            {step === 2 && (
              <PasoEscuela
                curso={selectedCurso}
                escuelas={escuelasDisponibles}
                loading={loadingEscuelas}
                onSelect={handleEscuelaSelect}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <PasoHorario
                curso={selectedCurso}
                escuela={selectedEscuela}
                cortes={cortesDisponibles}
                loading={loadingCortes}
                onSelect={handleCorteSelect}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <Formulario
                curso={selectedCurso}
                escuela={selectedEscuela}
                corte={selectedCorte}
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errorMessage={errorMessage}
                onBack={() => setStep(3)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormularioAlumno;

// src/pages/cursoDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CuadrosCursoDetails from '../components/CuadrosCursoDetails';
import NoticiasCurso from '../components/NoticiasCurso';
import { fetchHorarios } from '../services/api';

const CursosDetail = () => {
  const { id } = useParams(); // Obtenemos el parámetro :id de la ruta
  const [curso, setCurso] = useState(null);
  const navigate = useNavigate();
  const [horariosByCurso, setHorariosByCurso] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = import.meta.env.VITE_API_TOKEN;
  const [escuelasDisponibles, setEscuelasDisponibles] = useState([]);
  
  // Función para obtener horarios por curso
  const getHorariosByCurso = async (cursoId) => {
    try {
      console.log("Obteniendo horarios para el curso ID:", cursoId);
      const response = await fetchHorarios(cursoId, token);
      console.log("Respuesta de horarios:", response);
      
      setHorariosByCurso(response);
      
      // Extraer escuelas disponibles si es necesario
      if (response && response.length > 0) {
        const escuelas = response
          .filter(h => h.attributes?.escuela?.data)
          .map(h => h.attributes.escuela.data);
        setEscuelasDisponibles(escuelas);
      }
      
    } catch (err) {
      console.error("Error al obtener horarios:", err);
      setHorariosByCurso([]);
      setEscuelasDisponibles([]);
    }
  };
  
  useEffect(() => {
    // Función para obtener el curso por ID
    const fetchCurso = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://centroformacion.hopto.org/api/cursos/${id}?populate=*`);
        const data = await response.json();
        setCurso(data.data);
        
        // Una vez que tenemos el curso, obtenemos los horarios
        await getHorariosByCurso(id);
        
      } catch (error) {
        console.error('Error al obtener el curso:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurso();
  }, [id]); // Solo se ejecuta cuando cambia el ID
  
  if (loading || !curso) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  const urlImagen = (url) => {
    return 'https://centroformacion.hopto.org' + url.ImagenInicio.data.attributes.url;
  };

  const goToInscripcion = () => {
    navigate('/inscripcion');
  };

  const goToCampusVirtual = () => {
    // Redirige a la URL externa
    window.location.href = 'https://aula.centrodeformacionitinerante2.com/';
  };

  return (
    <div className='mt-24'>
      <div className={`flex m-[5%] flex-col lg:flex-row`}>
        <div className='lg:m-14 flex flex-col justify-center gap-10'>
          <h1 className='text-6xl lg:text-6xl font-sans font-bold text-slate-800 mt-5'>{curso.attributes.Nombre}</h1>
          <p className='text-xl'>{curso.attributes.Descripcioncorta}</p>
          
          <div className='flex gap-5'>
            <button 
              type="button" 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={goToCampusVirtual}
            >
              Campus virtual
            </button>
  
            <button 
              type="button" 
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={goToInscripcion}
            >
              ¡Inscribite ya!
            </button>
          </div>    
        </div>
  
        <div>
          <img className='' src={urlImagen(curso.attributes)} alt={curso.attributes.Nombre} />            
        </div>
      </div>
      <div className="w-full px-[5%] my-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Horarios Disponibles</h2>
        {horariosByCurso && horariosByCurso.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Escuela</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Horario</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Fecha de Inicio</th>
                </tr>
              </thead>
              <tbody>
                {horariosByCurso.map((horario) => (
                  <tr key={horario.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {horario.attributes?.escuela?.data?.attributes?.Nombre || "No especificado"}
                    </td>
                    <td className="py-3 px-4">
                      {horario.attributes?.Inicio_fin || "No especificado"}
                    </td>
                    <td className="py-3 px-4">
                    17/3/2026

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center bg-gray-50 rounded-lg">
            No hay horarios disponibles para este curso
          </div>
        )}
      </div>  
      <div className='w-full flex justify-center'> 
        <CuadrosCursoDetails />
      </div>
      
      <NoticiasCurso idCurso={id} />
    </div>
  );
};

export default CursosDetail;
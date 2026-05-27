import { useState, useEffect } from 'react';
import { fetchCursosPublicados } from '../services/api';

const useFetchCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCursos = async () => {
      try {
        const data = await fetchCursosPublicados();
        setCursos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCursos();
  }, []);

  return { cursos, loading, error };
};

export default useFetchCursos;

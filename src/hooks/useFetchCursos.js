import { useState, useEffect } from 'react';
import { fetchCursos } from '../services/api';

const useFetchCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCursos = async () => {
      try {
        const response = await fetchCursos();
        setCursos(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCursos();
  }, []);

  return { cursos, loading, error };
};

export default useFetchCursos;

import axios from 'axios';

const API_BASE_URL = 'https://centroformacion.hopto.org/api';

export const fetchCursos = () => {
  
  return axios.get(`${API_BASE_URL}/cursos?fields=Nombre&populate[escuelaxturnos][fields]=id&populate[escuelaxturnos][populate][escuela][fields]=Nombre&populate[escuelaxturnos][populate][turno][fields]=Nombre
`);

};

export const postAlumno = (data, token) => {
  return axios.post(`${API_BASE_URL}/alumnospres`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



// Función para obtener horarios por curso
export const fetchHorarios = async (cursoId, token) => {
  try {
    // Usar exactamente la URL que sabemos que funciona
    const apiUrl = `https://centroformacion.hopto.org/api/horarios?filters[curso][id]=${cursoId}&populate=escuela,curso`;
    console.log("Llamando API con URL:", apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respuesta de la API - Status:", response.status);
    console.log("Respuesta de la API - OK:", response.ok);
    
    if (!response.ok) {
      // Intentar leer el texto de la respuesta para depuración
      const responseText = await response.text();
      console.error("Respuesta de error:", responseText.substring(0, 500) + "..."); // Primeros 500 caracteres
      throw new Error(`Error al obtener los horarios: ${response.status} ${response.statusText}`);
    }
    
    // Intentamos leer el texto primero para depurar
    const responseText = await response.text();
    
    // Verificar que sea JSON válido
    if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
      const data = JSON.parse(responseText);
      return data.data;
    } else {
      console.error("Respuesta no es JSON válido:", responseText.substring(0, 500) + "...");
      throw new Error("La respuesta no es un JSON válido");
    }
    
  } catch (error) {
    console.error('Error completo:', error);
    
    // Para depuración, verificamos qué tipo de URL se está utilizando
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    
    throw error;
  }
};

// Función para obtener horarios sim
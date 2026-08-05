import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchTexto } from '../../services/api';

const TEXTO_AVISO_ID = 1;
const AVISO_CUPO_FALLBACK = 'Los cursos de **Secretariado Contable**, **Operador Marketing y Ventas** y **Auxiliar en Bancos y Financieras** ya han cubierto su cupo de **Pre-inscripción**.';

const bloqueStyle = {
  background: 'linear-gradient(180deg, #f7fbff 0%, #ffffff 100%)',
  border: '1px solid #d7e7f8',
  padding: '24px',
  borderRadius: '22px',
  marginBottom: '22px',
};

const h3Style = {
  margin: '0 0 16px',
  color: '#123c69',
  fontSize: '21px',
  fontWeight: 800,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const botonStyle = {
  width: '100%',
  minHeight: '76px',
  margin: 0,
  padding: '16px 14px',
  background: '#ffffff',
  color: '#123c69',
  border: '2px solid #d8e8f8',
  borderRadius: '18px',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
  textAlign: 'center',
  lineHeight: '1.25',
  boxShadow: '0 8px 18px rgba(18, 60, 105, 0.07)',
};

const avisoCupoStyle = {
  marginTop: '18px',
  padding: '18px 20px',
  background: 'linear-gradient(135deg, #fff8e8 0%, #fffdf8 100%)',
  border: '1px solid #f4d28a',
  borderLeft: '6px solid #f59e0b',
  borderRadius: '16px',
  color: '#5f3b05',
  fontSize: '15px',
  lineHeight: '1.6',
  boxShadow: '0 10px 22px rgba(120, 74, 8, 0.1)',
};

const PasoCursos = ({ cursos, loading, onSelect }) => {
  const [avisoCupo, setAvisoCupo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchTexto(TEXTO_AVISO_ID)
      .then(({ contenidoTexto }) => {
        if (isMounted) setAvisoCupo(contenidoTexto);
      })
      .catch(() => {
        if (isMounted) setAvisoCupo(AVISO_CUPO_FALLBACK);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="inscr-bloque" style={bloqueStyle}>
      <h3 className="inscr-h3" style={h3Style}>Paso 1: Seleccione el curso</h3>

      {loading ? (
        <p style={{ color: '#667085', fontSize: '15px' }}>Cargando cursos...</p>
      ) : (
        <>
          <div
            className="inscr-grilla-cursos"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginTop: '18px' }}
          >
            {cursos.map((curso) => (
              <button
                key={curso.id}
                type="button"
                onClick={() => onSelect(curso)}
                className="inscr-boton-curso"
                style={botonStyle}
              >
                {curso.nombre}
              </button>
            ))}
          </div>
          {avisoCupo && (
            <div style={avisoCupoStyle}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p style={{ margin: 0 }}>{children}</p>,
                }}
              >
                {avisoCupo}
              </ReactMarkdown>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PasoCursos;

import React from 'react';

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

const PasoCursos = ({ cursos, loading, onSelect }) => {
  return (
    <div className="inscr-bloque" style={bloqueStyle}>
      <h3 className="inscr-h3" style={h3Style}>Paso 1: Seleccione el curso</h3>

      {loading ? (
        <p style={{ color: '#667085', fontSize: '15px' }}>Cargando cursos...</p>
      ) : (
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
      )}
    </div>
  );
};

export default PasoCursos;

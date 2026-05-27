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

const seleccionPreviaStyle = {
  background: '#ffffff',
  border: '1px solid #d7e7f8',
  borderLeft: '5px solid #2c7be5',
  borderRadius: '14px',
  padding: '14px 16px',
  color: '#344054',
  lineHeight: '1.5',
  boxShadow: '0 6px 15px rgba(18, 60, 105, 0.06)',
  marginBottom: '16px',
};

const labelStyle = {
  display: 'block',
  marginTop: '16px',
  marginBottom: '7px',
  fontWeight: 800,
  color: '#344054',
  fontSize: '14px',
};

const selectStyle = {
  width: '100%',
  padding: '14px 13px',
  border: '1px solid #cbd7e3',
  borderRadius: '14px',
  fontSize: '15px',
  background: '#ffffff',
  color: '#1f2933',
  cursor: 'pointer',
};

const botonSecundarioStyle = {
  width: '100%',
  marginTop: '14px',
  padding: '13px',
  background: '#f1f6fb',
  color: '#123c69',
  border: '1px solid #c9def5',
  borderRadius: '14px',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
};

const PasoHorario = ({ curso, escuela, cortes, loading, onSelect, onBack }) => {
  const handleChange = (e) => {
    const corteId = parseInt(e.target.value, 10);
    const corte = cortes.find((c) => c.id === corteId);
    if (corte) onSelect(corte);
  };

  return (
    <div className="inscr-bloque" style={bloqueStyle}>
      <h3 className="inscr-h3" style={h3Style}>Paso 3: Seleccione el horario</h3>

      <p style={seleccionPreviaStyle}>
        Curso: <strong style={{ color: '#123c69' }}>{curso.nombre}</strong><br />
        Sede: <strong style={{ color: '#123c69' }}>{escuela.nombre}</strong>
      </p>

      {loading ? (
        <p style={{ color: '#667085', fontSize: '15px' }}>Cargando horarios...</p>
      ) : (
        <>
          {cortes.length === 0 ? (
            <p style={{ color: '#b45309', fontSize: '14px' }}>No hay horarios disponibles para esta escuela y curso.</p>
          ) : (
            <div style={{ marginBottom: '4px' }}>
              <label style={labelStyle}>Horario disponible</label>
              <select
                defaultValue=""
                onChange={handleChange}
                className="inscr-select"
                style={selectStyle}
              >
                <option value="" disabled>Seleccione un horario</option>
                {cortes.map((corte) => (
                  <option key={corte.id} value={corte.id}>
                    {corte.horario}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      <button
        type="button"
        onClick={onBack}
        className="inscr-boton-secundario"
        style={botonSecundarioStyle}
      >
        Cambiar escuela
      </button>
    </div>
  );
};

export default PasoHorario;

import React from 'react';

const campoStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)',
  border: '1px solid #dbe9f7',
  borderRadius: '20px',
  padding: '15px',
  boxShadow: '0 8px 20px rgba(18, 60, 105, 0.07)',
};

const campoLabelStyle = {
  display: 'block',
  marginBottom: '7px',
  fontWeight: 900,
  color: '#123c69',
  fontSize: '14px',
};

const campoInputStyle = {
  width: '100%',
  padding: '14px 13px',
  border: '1px solid #cbd7e3',
  borderRadius: '14px',
  fontSize: '15px',
  background: '#f8fbff',
  color: '#1f2933',
};

const errorStyle = { marginTop: '6px', fontSize: '13px', color: '#d33' };

const Campo = ({ label, children, fullWidth }) => (
  <div
    className="inscr-campo"
    style={fullWidth ? { ...campoStyle, gridColumn: '1 / -1' } : campoStyle}
  >
    <label style={campoLabelStyle}>{label}</label>
    {children}
  </div>
);

const Formulario = ({
  curso,
  escuela,
  corte,
  formData,
  errors,
  handleChange,
  handleSubmit,
  errorMessage,
  onBack,
}) => {
  return (
    <div
      className="inscr-bloque"
      style={{
        textAlign: 'center',
        background: `
          radial-gradient(circle at top left, rgba(44, 123, 229, 0.16), transparent 32%),
          radial-gradient(circle at bottom right, rgba(46, 157, 80, 0.15), transparent 35%),
          linear-gradient(180deg, #ffffff 0%, #f5faff 100%)
        `,
        border: '1px solid #d7e7f8',
        borderRadius: '22px',
        padding: '24px',
        marginBottom: '22px',
        boxShadow: '0 14px 34px rgba(18, 60, 105, 0.12)',
      }}
    >
      {/* Título */}
      <h3
        className="inscr-h3-datos"
        style={{
          margin: '0 0 18px',
          color: '#123c69',
          fontSize: '24px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        Paso 4: Datos personales
      </h3>

      {/* Resumen */}
      <div
        style={{
          marginBottom: '20px',
          padding: '16px',
          background: '#ecfdf3',
          borderLeft: '6px solid #2e9d50',
          borderRadius: '14px',
          color: '#245b35',
          lineHeight: '1.6',
          boxShadow: '0 8px 18px rgba(46, 157, 80, 0.12)',
          textAlign: 'left',
        }}
      >
        <strong style={{ color: '#17452a' }}>Preinscripción seleccionada:</strong><br />
        <strong>Curso:</strong> {curso.nombre}<br />
        <strong>Sede:</strong> {escuela.nombre}<br />
        <strong>Horario:</strong> {corte.horario}
      </div>

      {/* Intro */}
      <div
        style={{
          maxWidth: '620px',
          margin: '18px auto 26px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #eaf3ff 0%, #eefcf4 100%)',
          border: '1px solid #cfe3f8',
          borderRadius: '24px',
          padding: '24px 22px',
          boxShadow: '0 12px 28px rgba(18, 60, 105, 0.12)',
        }}
      >
        <div
          style={{
            width: '62px',
            height: '62px',
            minWidth: '62px',
            marginBottom: '10px',
            background: '#ffffff',
            border: '3px solid #d7e7f8',
            color: '#123c69',
            borderRadius: '50%',
            fontSize: '30px',
            boxShadow: '0 10px 22px rgba(18, 60, 105, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✨
        </div>
        <div>
          <h4 style={{ margin: '4px 0 8px', color: '#123c69', fontSize: '22px', fontWeight: 900 }}>
            ¡Ya casi terminás!
          </h4>
          <p style={{ maxWidth: '500px', margin: '0 auto', color: '#506070', fontSize: '15px', lineHeight: '1.6' }}>
            Completá tus datos personales para registrar tu preinscripción.
            Revisá que la información sea correcta antes de enviar.
          </p>
        </div>
      </div>

      {/* Campos */}
      <form onSubmit={handleSubmit}>
        <div
          className="inscr-form-grid"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          <Campo label="Correo electrónico" fullWidth>
            <input
              className="inscr-input"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              style={campoInputStyle}
            />
            {errors.correo && <p style={errorStyle}>{errors.correo}</p>}
          </Campo>

          <Campo label="Apellido">
            <input
              className="inscr-input"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingrese su apellido"
              required
              style={campoInputStyle}
            />
            {errors.apellido && <p style={errorStyle}>{errors.apellido}</p>}
          </Campo>

          <Campo label="Nombre">
            <input
              className="inscr-input"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              required
              style={campoInputStyle}
            />
            {errors.nombre && <p style={errorStyle}>{errors.nombre}</p>}
          </Campo>

          <Campo label="DNI (sin puntos)">
            <input
              className="inscr-input"
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Sin puntos"
              required
              style={campoInputStyle}
            />
            {errors.dni && <p style={errorStyle}>{errors.dni}</p>}
          </Campo>

          <Campo label="Fecha de nacimiento">
            <input
              className="inscr-input"
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              style={campoInputStyle}
            />
            {errors.fechaNacimiento && <p style={errorStyle}>{errors.fechaNacimiento}</p>}
          </Campo>

          <Campo label="Sexo">
            <select
              className="inscr-select"
              name="Sexo"
              value={formData.Sexo}
              onChange={handleChange}
              required
              style={{ ...campoInputStyle, cursor: 'pointer' }}
            >
              <option value="">Seleccione una opción</option>
              <option value="true">Masculino</option>
              <option value="false">Femenino</option>
            </select>
            {errors.Sexo && <p style={errorStyle}>{errors.Sexo}</p>}
          </Campo>

          <Campo label="Celular (Ej: 3764...)">
            <input
              className="inscr-input"
              type="tel"
              name="Celular"
              value={formData.Celular}
              onChange={handleChange}
              placeholder="Ej: 3764..."
              required
              style={campoInputStyle}
            />
            {errors.Celular && <p style={errorStyle}>{errors.Celular}</p>}
          </Campo>
        </div>

        {/* Nota */}
        <p
          style={{
            maxWidth: '680px',
            margin: '22px auto 0',
            textAlign: 'center',
            background: '#fffdf3',
            border: '1px dashed #f0c85a',
            color: '#705800',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          La preinscripción no confirma automáticamente la vacante.
          La institución podrá comunicarse para confirmar disponibilidad, documentación y condiciones de cursado.
        </p>

        {errorMessage && (
          <p style={{ color: '#d33', fontSize: '14px', textAlign: 'center', marginTop: '12px' }}>
            {errorMessage}
          </p>
        )}

        {/* Botones */}
        <div style={{ maxWidth: '520px', margin: '10px auto 0' }}>
          <button
            type="submit"
            className="inscr-boton-enviar"
            style={{
              width: '100%',
              marginTop: '25px',
              padding: '15px',
              background: 'linear-gradient(135deg, #123c69 0%, #2c7be5 55%, #2e9d50 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              fontSize: '17px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 12px 24px rgba(18, 60, 105, 0.25)',
              minHeight: '56px',
              letterSpacing: '0.2px',
            }}
          >
            Enviar preinscripción
          </button>

          <button
            type="button"
            onClick={onBack}
            className="inscr-boton-secundario inscr-boton-secundario-datos"
            style={{
              width: '100%',
              marginTop: '14px',
              padding: '13px',
              background: '#ffffff',
              color: '#123c69',
              border: '1px solid #cfe3f8',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Cambiar horario
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;

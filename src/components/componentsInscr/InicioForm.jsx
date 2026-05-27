import React from 'react';
import cge from '../../assets/icons/cge.webp';
import cfpi from '../../assets/logo1.png';

const InicioForm = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #e4edf7' }}>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <img src={cge} alt="CGE" style={{ width: '120px' }} />
        <img src={cfpi} alt="CFPI" style={{ width: '96px' }} />
      </div>

      <h1 style={{ margin: 0, color: '#123c69', fontSize: '28px', lineHeight: '1.25', fontWeight: 800 }}>
        Centro de Formación Profesional Itinerante N.º 2
      </h1>

      <h2 style={{
        display: 'inline-block',
        margin: '12px 0 0',
        padding: '8px 18px',
        background: '#eaf3ff',
        color: '#2563a8',
        borderRadius: '999px',
        fontSize: '16px',
        fontWeight: 700,
      }}>
        Preinscripciones 2026
      </h2>

    </div>
  );
};

export default InicioForm;

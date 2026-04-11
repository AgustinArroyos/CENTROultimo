import React from 'react'
import style from './styles/CursosDetails.module.css'
import imageCalendar1 from '../assets/calendar1.png'
import imageCalendar2 from '../assets/calendar2.png'
import imageUser from '../assets/user.png'


const CuadrosCursoDetails = () => {
  return (
   
  <div className={`flex flex-col lg:flex-row mx-10 lg:mx-40 gap-8 mb-10 ${style.content}`} >
  <div className='flex flex-col items-center gap-5 border-blue-300 rounded-xl p-5 border-2 '>
      <img className='h-20' src={imageCalendar1} alt="" />
      <h2 className='text-2xl font-semibold text-blue-900'>Fecha de Inicio</h2>
      <p className="self-start">El inicio de las actividades sera el 2026</p>

  </div>

  <div className='flex flex-col items-center gap-5 border-blue-300 rounded-xl p-5 border-2 '>
      
      
   <img className='h-20' src={imageUser} alt="" />

      <h2 className='text-2xl font-semibold text-blue-900' >Cupos</h2>
      <p className="self-start">Los cupos disponibles son actualmente para 40 personas</p>

  </div>

  <div className='flex flex-col items-center gap-5 border-blue-300 rounded-xl p-5 border-2 '>

      <img className='h-20' src={imageCalendar2} alt="" />
      <h2 className='text-2xl font-semibold text-blue-900'>Duración</h2>
      <p className="self-start">La duración de las clases virtuales son de 4 Meses</p>

  </div>

  </div>
  )
}

export default CuadrosCursoDetails
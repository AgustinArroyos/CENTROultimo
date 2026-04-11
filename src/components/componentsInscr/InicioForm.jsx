import React from 'react'
import cge from '../../assets/icons/cge.webp'
import cfpi from '../../assets/logo1.png'


const InicioForm = () => {
  return (
    <div className='pt-10 mb-5 flex flex-col justify-center gap-5'>

            <div className='flex  justify-center  items-center'>
            <div>
                <img src={cge} alt="" className='w-36' />
            </div>
            <div><img src={cfpi} className='w-28' /></div>
            </div>

            <div className='flex flex-col justify-center  items-center'>
            <h2 className='text-xl font-serif lg:ml-0 ml-6'>Centro de Formación Profesional Itinerante Nro.2</h2>
            <div><h1 className='text-3xl font-serif'>Inscripciones 2026</h1></div>

            {/* <p className='text-base font-serif'>Sebastopol 3075, Posadas, Misiones</p> 
            <p className='text-base font-serif'>+54 9 3764 15-5513</p>
            <p className='text-base font-serif'>centrodeformacionitinerante2@gmail.com</p> */}
            </div>
            
            

    </div>



  )
}

export default InicioForm
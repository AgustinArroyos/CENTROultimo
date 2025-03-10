import React from 'react'
import Banner from '../assets/Banner2.mp4';

const Hero = () => {
  return (
    <div className='right-0 left-0' >
        <video
        className=" mt-5 left-0' "
        src={Banner}
        autoPlay
        loop
        muted
      />


    </div>
  )
}

export default Hero
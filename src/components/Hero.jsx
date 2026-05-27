import React from 'react';
import Banner from '../assets/Banner3.mp4';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-16">
      <video
        className="h-[48vh] min-h-[320px] w-full object-cover object-center md:h-[100vh]"
         style={{ objectPosition: '50% 10%' }} 
        src={Banner}
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
};

export default Hero;

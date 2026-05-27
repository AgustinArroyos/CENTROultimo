import React, { useEffect, useRef } from 'react';
import { FaEnvelope, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { icon: FaMapMarkerAlt, label: 'Direccion', value: 'Pedro Morcillo 3075, Posadas, Misiones' },
  { icon: FaEnvelope, label: 'Email', value: 'centrodeformacionitinerante2@gmail.com' },
  { icon: FaClock, label: 'Horarios', value: 'Lunes a Viernes de 14:00hs a 20:00hs' },
];

const Mapa = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.map-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="map-reveal overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/10">
          <iframe
            title="Ubicacion del Centro de Formacion Profesional Itinerante N2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.123178290419!2d-55.90465456845078!3d-27.377813361120552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457be4666f0cbf7%3A0x71fc6fefafa770fb!2sInstituto%20Posadas%200403!5e0!3m2!1ses!2sar!4v1727102864432!5m2!1ses!2sar"
            className="h-[360px] w-full border-0 lg:h-full lg:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="map-reveal flex flex-col justify-between rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10 lg:p-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-sky-300">Ubicacion y contacto</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Centro de formacion profesional itinerante N2</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Estamos en Posadas para acompanar tu formacion con cursos gratuitos, orientacion y atencion presencial.
            </p>
          </div>

          <div className="my-10 grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-400/15 text-sky-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</h3>
                    <p className="mt-1 text-base font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.instagram.com/cdfpi2misiones/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-100"
            >
              <FaInstagram className="h-5 w-5" />
              Instagram
            </a>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mapa;

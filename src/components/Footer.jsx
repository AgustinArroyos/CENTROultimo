import React, { useEffect, useRef } from 'react';
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Inscripcion', to: '/inscripcion' },
  { label: 'Noticias', to: '/posts' },
  { label: 'Cursos', to: '/cursos' },
];

const MyFooter = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.footer-reveal',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 84%' },
        }
      );
    }, footerRef);

    return () => context.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.25fr_0.75fr_1fr]">
          <div className="footer-reveal">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
                <img src={logo} alt="C. F. P. I. N2" className="h-9 w-9 object-contain" />
              </span>
              <span>
                <span className="block text-lg font-bold">Centro de Formacion Profesional</span>
                <span className="text-sm text-slate-400">Itinerante N2 - Misiones</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Cursos gratuitos, capacitacion laboral y acompanamiento para que mas personas accedan a nuevas oportunidades de formacion.
            </p>
          </div>

          <div className="footer-reveal">
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Navegacion</h3>
            <div className="mt-5 grid gap-3">
              {footerLinks.map((link) => (
                <Link key={link.label} to={link.to} className="w-fit text-sm font-semibold text-slate-200 transition hover:text-sky-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-reveal">
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Contacto</h3>
            <div className="mt-5 grid gap-4 text-sm text-slate-300">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
                <span>Pedro Morcillo 3075, Posadas, Misiones</span>
              </div>
              <a href="mailto:centrodeformacionitinerante2@gmail.com" className="flex gap-3 transition hover:text-sky-300">
                <FaEnvelope className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
                <span>centrodeformacionitinerante2@gmail.com</span>
              </a>
              <div className="flex gap-3 pt-2">
                <a href="https://www.instagram.com/cdfpi2misiones/" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-sky-500">
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-emerald-500">
                  <FaWhatsapp className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-reveal flex flex-col gap-3 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026 Centro de Formacion Profesional Itinerante N2.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;

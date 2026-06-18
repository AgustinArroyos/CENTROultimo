import React, { useEffect, useRef, useState } from "react";
import logo from '../assets/logo1.png';
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaChevronDown, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";

const navItems = [
  { label: 'INICIO', path: '/', type: 'route' },
  { label: 'INSCRIPCION', path: '/inscripcion', type: 'route', featured: true },
  {
    label: 'CURSOS',
    type: 'dropdown',
    children: [
      { label: 'Instalaciones Electricas', path: '/curso/4', type: 'route' },
      { label: 'Reparacion PC', path: '/curso/1', type: 'route' },
      { label: 'Diseño Asistido por Autocad', path: '/curso/3', type: 'route' },
      { label: 'Marketing Digital', path: '/curso/5', type: 'route' },
      { label: 'Operador Pc', path: '/curso/2', type: 'route' },
      { label: 'Programador', path: '/curso/7', type: 'route' },
      { label: 'Programador web', path: '/curso/6', type: 'route' },
      { label: 'Secretariado Administrativo Contable', path: '/curso/9', type: 'route' },
      { label: 'Auxiliar Administrativo', path: '/curso/8', type: 'route' },
    ],
  },
  { label: 'SUBIR DOCUMENTOS', path: 'https://docs.google.com/forms/d/e/1FAIpQLSf8zVjro-lBU8tDMO4uBPmZ2oqJPqYHvKnGFF3gZwRIA4yDcA/viewform', type: 'external' },
  { label: 'AULA VIRTUAL', path: 'https://aula2.centrodeformacionitinerante2.com/', type: 'external' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const isInscripcionPage = location.pathname === '/inscripcion';
  const navRouteClass = isInscripcionPage
    ? 'border-sky-200/25 bg-slate-950 py-3 shadow-2xl shadow-slate-950/35 backdrop-blur-xl'
    : isSticky
      ? 'border-white/15 bg-slate-950/90 py-2 shadow-2xl shadow-slate-950/20 backdrop-blur-xl'
      : 'border-white/10 bg-slate-950/78 py-3 backdrop-blur-lg';

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isMenuOpen]);

  const renderDesktopItem = (item) => {
    if (item.type === 'dropdown') {
      return (
        <li key={item.label} className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:text-white"
            type="button"
          >
            {item.label}
            <FaChevronDown className={`h-3 w-3 transition ${openDropdown === item.label ? 'rotate-180' : ''}`} />
          </button>
          {openDropdown === item.label && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/20">
              <div className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Cursos</div>
              <div className="grid gap-1">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.path}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-800"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      );
    }

    const baseClass = item.featured
      ? 'rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-lg shadow-sky-950/20 transition hover:-translate-y-0.5 hover:bg-sky-100'
      : 'rounded-full px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:text-white';

    if (item.type === 'external') {
      return (
        <li key={item.label}>
          <a href={item.path} target="_blank" rel="noopener noreferrer" className={`${baseClass} inline-flex items-center gap-2`}>
            {item.label}
            <FaExternalLinkAlt className="h-3 w-3 opacity-70" />
          </a>
        </li>
      );
    }

    return (
      <li key={item.label}>
        <Link to={item.path} className={baseClass}>{item.label}</Link>
      </li>
    );
  };

  const renderMobileItem = (item) => {
    if (item.type === 'dropdown') {
      return (
        <div key={item.label} className="rounded-2xl bg-slate-900/70">
          <button
            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-white"
            type="button"
          >
            {item.label}
            <FaChevronDown className={`h-3 w-3 transition ${openDropdown === item.label ? 'rotate-180' : ''}`} />
          </button>
          {openDropdown === item.label && (
            <div className="grid gap-1 border-t border-white/10 px-3 py-3">
              {item.children.map((child) => (
                <Link key={child.label} to={child.path} className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    const className = item.featured
      ? 'block rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-sky-950'
      : 'block rounded-2xl bg-slate-900/70 px-4 py-3 text-sm font-bold text-white hover:bg-white/10';

    if (item.type === 'external') {
      return <a key={item.label} href={item.path} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a>;
    }

    return <Link key={item.label} to={item.path} className={className}>{item.label}</Link>;
  };

  return (
    <div>
      <header ref={headerRef} className="fixed left-0 right-0 top-0 z-[10001] px-3 py-3 md:px-6">
        <nav className={`mx-auto max-w-7xl rounded-3xl border px-4 transition-all duration-300 md:px-6 ${navRouteClass}`}>
          <div className="flex items-center justify-between gap-5">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white shadow-lg shadow-sky-950/20">
                <img src={logo} alt="C. F. P. I. N°2" className="h-8 w-8 object-contain" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold leading-tight text-white md:text-base">C. F. P. I. N°2</span>
                <span className="hidden text-xs font-medium text-sky-100/75 sm:block">Formacion profesional itinerante</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map(renderDesktopItem)}
            </ul>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
              type="button"
              aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div ref={mobileMenuRef} className="grid gap-3 pt-4 lg:hidden">
              {navItems.map(renderMobileItem)}
            </div>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Navbar;

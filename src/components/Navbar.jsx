import React, { useEffect, useState } from "react";
import logo from '../assets/logo1.png';
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

// Dentro de tu componente Navbar
const navItems = [
  { label: 'INICIO', path: '/', type: 'route' },
  { label: 'INSCRIPCION', path: '/inscripcion', type: 'route' },
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
  }, // Nuevo elemento
  { label: 'SUBIR DOCUMENTOS', path: 'https://docs.google.com/forms/d/e/1FAIpQLSf8zVjro-lBU8tDMO4uBPmZ2oqJPqYHvKnGFF3gZwRIA4yDcA/viewform', type: 'external' },
  { label: 'AULA VIRTUAL', path: 'https://aula2.centrodeformacionitinerante2.com/', type: 'external' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Nuevo estado para controlar los dropdowns

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleDropdown = (label) => {
      setOpenDropdown(openDropdown === label ? null : label);
    };

 useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsSticky(true);
          setIsMenuOpen(false);
        } else {
          setIsSticky(false);
        }
      };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
    <header className="bg-sky-950 fixed top-0 left-0 right-0">
      <nav
        className={`py-4 lg:px-7 px-4 ${
          isSticky ? 'sticky top-0 bg-sky-800 transition-all duration-300' : ''
        }`}
      >
        <div className="flex justify-between items-center text-base gap-10 mr-7">
          <Link to="/" className="text-2xl font-semibold flex items-center space-x-1">
            <img src={logo} alt="Logo" className="w-10" />
            <span className="text-white text-lg">C. F. P. I. N°2</span>
          </Link>

          {/* Menú de navegación para pantallas grandes */}
          <ul className="md:flex space-x-12 hidden text-white">
            {navItems.map((item) => {
              if (item.type === 'dropdown') {
                // Renderizar el dropdown
                return (
                  <li key={item.label} className="relative group">
                    <button
                      onClick={() => handleDropdown(item.label)}
                      className="text-base font-bold hover:text-sky-300 flex items-center"
                    >
                      {item.label}
                      <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <ul className="absolute mt-2 bg-white text-gray-700 rounded shadow-lg z-10 transition-all duration-300 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            {child.type === 'route' ? (
                              <Link
                                to={child.path}
                                className="block px-4 py-2 hover:bg-blue-600 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <a
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {child.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              } else {
                // Renderizar elementos normales
                if (item.type === 'scroll') {
                  return (
                    <ScrollLink
                      to={item.path}
                      spy={true}
                      smooth={true}
                      offset={-100}
                      key={item.label}
                      className="cursor-pointer text-base text-white-900 hover:text-sky-100 font-medium"
                    >
                      {item.label}
                    </ScrollLink>
                  );
                } else if (item.type === 'route') {
                  return (
                    <Link
                      to={item.path}
                      key={item.label}
                      className="text-base text-white-900 hover:text-sky-300 font-bold"
                    >
                      {item.label}
                    </Link>
                  );
                } else if (item.type === 'external') {
                  return (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.label}
                      className="text-base text-white-900 hover:text-sky-300 font-bold"
                    >
                      {item.label}
                    </a>
                  );
                }
              }
              return null;
            })}
          </ul>

          {/* Botón del menú móvil */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-white" />
              ) : (
                <FaBars className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-sky-950 py-7 space-y-4">
            {navItems.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => handleDropdown(item.label)}
                      className="text-white hover:text-gray-500 flex items-center w-full text-left px-4 py-2"
                    >
                      {item.label}
                      <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <ul className="pl-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            {child.type === 'route' ? (
                              <Link
                                to={child.path}
                                onClick={toggleMenu}
                                className="block text-white hover:text-gray-500 px-4 py-2"
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <a
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={toggleMenu}
                                className="block text-white hover:text-gray-500 px-4 py-2"
                              >
                                {child.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              } else {
                if (item.type === 'scroll') {
                  return (
                    <ScrollLink
                      to={item.path}
                      spy={true}
                      smooth={true}
                      offset={-90}
                      key={item.label}
                      onClick={toggleMenu}
                      className="block text-white hover:text-gray-500 cursor-pointer"
                    >
                      {item.label}
                    </ScrollLink>
                  );
                } else if (item.type === 'route') {
                  return (
                    <Link
                      to={item.path}
                      key={item.label}
                      onClick={toggleMenu}
                      className="block text-white hover:text-gray-500 px-4 py-2"
                    >
                      {item.label}
                    </Link>
                  );
                } else if (item.type === 'external') {
                  return (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.label}
                      onClick={toggleMenu}
                      className="block text-white hover:text-gray-500 px-4 py-2"
                    >
                      {item.label}
                    </a>
                  );
                }
              }
              return null;
            })}
          </div>
        )}
      </nav>
    </header>
    <div className="mt-12">
      <Outlet />
    </div>
  </div>
  );
};

export default Navbar;
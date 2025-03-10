import { useEffect, useState } from "react";
import logo from '../assets/logo1.png'
import { Link } from "react-scroll";
// import icons from react icons
import { FaXmark, FaBars } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const Navgre = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
        setIsMenuOpen(false)
      }
      else{
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {link: "Inicio", path: "home" },
    {link: "Nosotros", path: "http://localhost:5173/nosotros" },
    {link: "Inscripcion", path: "https://docs.google.com/forms/d/e/1FAIpQLScWN5GrtscVIDzE1YeWx_-dfBKAOQ8BNTR35PX1KBUH3xxucQ/viewform" },
    {link: "Subir Documentos", path: "https://docs.google.com/forms/d/e/1FAIpQLSf8zVjro-lBU8tDMO4uBPmZ2oqJPqYHvKnGFF3gZwRIA4yDcA/viewform" },

    {link: "Aula Virtual", path: "https://aula.centrodeformacionitinerante2.com/" },
  ];
  return (<div>
    <header className=" bg-white md:bg-transparent fixed top-0 left-0 right-0">
      <nav className={`py-4 lg:px-14 px-4 ${
          isSticky ? "sticky top-0 right-0 left-0 border bg-white transition-all duration-300" : ""
        }`}>
        <div className="flex justify-between items-center text-base gap-8">
          <a href="/" className="text-2xl font-semibold flex items-center space-x-3"><img src={logo} alt="" className="w-10 inline-block items-center"/><span>C.F.P.I.  N2</span></a>

          <ul className="md:flex space-x-12 hidden">
            
          {
                navItems.map(({link, path}) => {
                  if (link === "Aula Virtual" ||link === "Inscripcion" ||link === "Subir Documentos"  ) {
                    return <a href={path} target="_blank" rel="noopener noreferrer" className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">{link}</a>;
                  } else {
                    return <Link to={path} spy={true} smooth={true} offset={-100} key={link} className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">{link}</Link>;
                  }
                })
            }
          </ul>

         

          {/* menu btn, visible on mobile screen */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray900 focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark  className="h-6 w-6 text-primary"/>
              ) : (
                <FaBars className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        <div
        className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}
      >
        {
                navItems.map(({link, path}) => <Link 
                to={path} spy={true} smooth={true} offset={-90}
                key={link} 
                onClick={toggleMenu}
                className="block  text-white hover:text-gray-500"
                >
                {link}
              </Link> )
            }
      </div>
      </nav>
    </header>

<Outlet/>

</div>
  );
};

export default Navgre;
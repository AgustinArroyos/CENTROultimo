
import "./App.css";
import Blog from "./components/Blog";
import Product from "./components/Product";
import Hero from "./components/Hero";
import CursosInicio from "./pages/CursosInicio";
import Mapa from "./pages/Mapa";
import Gancho from "./components/Gancho";
import Prueba from "./pages/Prueba";
import Cursada from "./components/Cursada";
import MyFooter from "./components/Footer";
MyFooter

function App() {


  return (
    <>
    <div className="flex flex-col justify-center">
    <Hero/>
    <Prueba/>
    <Cursada/>
    <Gancho/>

    <Blog/>

      <Mapa/> 
      {/* 

 <Product/>
      */}
      <MyFooter/>
      </div>
    </>
  );
}

export default App;

import './App.css';
import Blog from './components/Blog';
import Hero from './components/Hero';
import Mapa from './pages/Mapa';
import Gancho from './components/Gancho';
import Prueba from './pages/Prueba';
import Cursada from './components/Cursada';
import MyFooter from './components/Footer';

function App() {
  return (
    <div className="flex flex-col justify-center overflow-hidden bg-white">
      <Hero />
      <Prueba />
      <Cursada />
      <Gancho />
      <Blog />
      <Mapa />
      <MyFooter />
    </div>
  );
}

export default App;

import './App.css';
import Home from './screens/Home';
import Jugadores from './screens/Jugadores';
import Equipos from './screens/Equipos';
import Temporadas  from './screens/Temporadas';
import Contact from './screens/Contact';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      
        <Navbar />
        
        <div id='SeccionInicio'>
        <Home />
        </div>
        <div id='SeccionJugadores'>
        <Jugadores />
        </div>
        <div id='SeccionEquipos'>
        <Equipos />
        </div>
        <div id='SeccionTemporadas'>
        <Temporadas />
        </div>
        <div id='SeccionContacto'>
        <Contact />
        </div>
    </div>
  );
}

export default App;
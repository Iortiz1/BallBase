import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Jugadores.module.css"; 
import miImagen from '../imagenespagina/jordan1.jpg';

const Jugadores = () => {
  const [data, setData] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [filtroEquipo, setFiltroEquipo] = useState('');
  const [filtroPosicion, setFiltroPosicion] = useState('');
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/tfg/obtenerjugadores.php')
      .then(response => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Los datos recibidos no son un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Obtener todos los equipos disponibles
    axios.get('http://localhost/tfg/obtenerEquipos.php')
      .then(response => {
        setEquipos(response.data);
      })
      .catch(error => {
        console.error('Error fetching equipos:', error);
      });
  }, []);

  useEffect(() => {
    let jugadoresFiltrados = [];
  
    if (filtroEquipo && !filtroPosicion) {
      jugadoresFiltrados = data.filter(
        jugador => jugador.Nombre_equipo === filtroEquipo
      );
    } else if (!filtroEquipo && filtroPosicion) {
      jugadoresFiltrados = data.filter(
        jugador => jugador.posicion === filtroPosicion || jugador.posicion.includes(filtroPosicion)
      );
    } else if (filtroEquipo && filtroPosicion) {
      jugadoresFiltrados = data.filter(
        jugador =>
          jugador.Nombre_equipo === filtroEquipo &&
          jugador.posicion === filtroPosicion
      );
    } else {
      jugadoresFiltrados = data; // Si no hay filtros aplicados, muestra todos los datos
    }
    setJugadoresFiltrados(jugadoresFiltrados);
  }, [filtroEquipo, filtroPosicion, data]);

  const handleEquipoChange = event => {
    setFiltroEquipo(event.target.value);
    
  };

  const handlePosicionChange = event => {
    
    const selectedPosition = event.target.value;
    const selectedEquipo = filtroEquipo;
    if (selectedPosition === 'C' || selectedPosition === 'F-C' || selectedPosition === 'F' || selectedPosition === 'F-G' || selectedPosition === 'G') {
      axios.get(`http://localhost/tfg/obtenerjugadores.php?posicion=${selectedPosition}&equipo=${selectedEquipo}`)
        .then(response => {''
          setJugadoresFiltrados(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      setFiltroPosicion(selectedPosition);
    }
  };

  return (
    <div>
      <div className={styles.Jugadores}>
        <h1>Lista de todos los jugadores NBA</h1>
        <div>
        <label htmlFor="equipo">Equipo:</label>
        <select id="equipo" value={filtroEquipo} onChange={handleEquipoChange}>
          <option value="">Selecciona un equipo</option>
          <option value="76ers">76ers</option>
          <option value="Bobcats">Bobcats</option>
          <option value="Bucks">Bucks</option>
          <option value="Bulls">Bulls</option>
          <option value="Cavaliers">Cavaliers</option>
          <option value="Celtics">Celtics</option>
          <option value="Clippers">Clippers</option>
          <option value="Grizzlies">Grizzlies</option>
          <option value="Hawks">Hawks</option>
          <option value="Heat">Heat</option>
          <option value="Hornets">Hornets</option>
          <option value="Jazz">Jazz</option>
          <option value="Kings">Kings</option>
          <option value="Knicks">Knicks</option>
          <option value="Lakers">Lakers</option>
          <option value="Magic">Magic</option>
          <option value="Maveric">Maveric</option>
          <option value="Nets">Nets</option>
          <option value="Nuggets">Nuggets</option>
          <option value="Pacers">Pacers</option>
          <option value="Pistons">Pistons</option>
          <option value="Raptors">Raptors</option>	
          <option value="Rockets">Rockets</option>	
          <option value="Spurs">Spurs</option>
          <option value="Suns">Suns</option>
        
        </select>
      
        <label htmlFor="posicion">Posición:</label>
        <select id="posicion" value={filtroPosicion} onChange={handlePosicionChange}>
          <option value="">Selecciona una posición</option>
          <option value="C">Pivot</option>
          <option value="F-C">AlaPivot</option>
          <option value="F">Alero</option>
          <option value="F-G">Escolta</option>
          <option value="G">Base</option>
        </select>
        <h2>Jugadores filtrados:</h2>
      <table>
  <thead>
    <tr>
      <th>Código</th>
      <th>Nombre</th>
      <th>Procedencia</th>
      <th>Altura</th>
      <th>Peso</th>
      <th>Posición</th>
      <th>Equipo</th>
    </tr>
  </thead>
  <tbody>
  {Array.isArray(jugadoresFiltrados) && jugadoresFiltrados.length > 0 ? (
    jugadoresFiltrados.map(jugador => (
      <tr key={jugador.codigo}>
        <td>{jugador.codigo}</td>
        <td>{jugador.Nombre}</td>
        <td>{jugador.Procedencia}</td>
        <td>{jugador.Altura}</td>
        <td>{jugador.Peso}</td>
        <td>{jugador.Posicion}</td>
        <td>{jugador.Nombre_equipo}</td>
      </tr>

    ))
    ) : (
      <tr>
      <td colSpan="7">No se encontraron jugadores.</td>
    </tr>
  )}
  </tbody>
</table>
<br />
</div>
        <img src={miImagen} alt="ImagenJordan" />
      </div>
    </div>
  );
};

export default Jugadores;
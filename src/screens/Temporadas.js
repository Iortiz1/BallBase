import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Temporadas.module.css";

const Temporadas = () => {
  const [filtroEquipo, setFiltroEquipo] = useState('');
  const [filtroTemporada, setFiltroTemporada] = useState('');
  const [partidosFiltrados, setPartidosFiltrados] = useState([]);

  const handleEquipoChange = event => {
    setFiltroEquipo(event.target.value);
  };
// Cuando ocurra un cambio en el elemento que está siendo escuchado por handleEquipoChange, event.target.value contendrá el nuevo valor de ese elemento
  const handleTemporadaChange = event => {
    setFiltroTemporada(event.target.value);
  };

  useEffect(() => {
    if (filtroEquipo && filtroTemporada) {
      axios.get(`http://localhost/tfg/obtenertemporadas.php?equipo=${filtroEquipo}&temporada=${filtroTemporada}`)
        .then(response => {
          setPartidosFiltrados(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [filtroEquipo, filtroTemporada]);

  return (
    <div className={styles.temporadas}>
      <h1>Temporadas</h1>
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
      <label htmlFor="temporada">Temporada:</label>
      <select id="temporada" value={filtroTemporada} onChange={handleTemporadaChange}>
        <option value="">Selecciona una temporada</option>
          <option value="98/99">98/99</option>
          <option value="99/00">99/00</option>
          <option value="00/01">00/01</option>
          <option value="00/01">01/02</option>
          <option value="00/01">02/03</option>
          <option value="00/01">03/04</option>
          <option value="00/01">04/05</option>
          <option value="00/01">05/06</option>
          <option value="00/01">06/07</option>
          <option value="00/01">07/08</option>
      </select>
      <h2>Partidos del Equipo en la Temporada Indicada:</h2>
      <table>
        <thead>
          <tr>
          <th>Código</th>
          <th>Equipo local</th>
          <th>Equipo Visitante</th>
          <th>Puntos Local</th>
          <th>Puntos Visitante</th>
          <th>Temporada</th>
          </tr>
        </thead>
        <tbody>
          {partidosFiltrados.map(partido => (
            <tr key={partido.codigo}>
              <td>{partido.codigo}</td>
              <td>{partido.equipo_local}</td>
              <td>{partido.equipo_visitante}</td>
              <td>{partido.puntos_local}</td>
              <td>{partido.puntos_visitante}</td>
              <td>{partido.temporada}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Temporadas;
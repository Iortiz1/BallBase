import React, { useEffect, useState } from 'react';
import styles from './Equipos.module.css';
import axios from 'axios';

const Equipos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/tfg/obtenerequipos.php')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Función para obtener la URL del logotipo según el nombre del equipo
  const getLogoUrl = teamName => {
    // Definir la ruta base para las imágenes de logos
    const basePath = '/logos/';
    // Formar la ruta completa para la imagen del equipo
    const imageUrl = `${basePath}${teamName}.png`;

    return imageUrl;
  };

  return (
    <div>
      <div className={styles.Equipos}>
        <h1>Lista de equipos</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Conferencia</th>
              <th>División</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
            {data.map(equipo => (
              <tr key={equipo.Nombre}>
                <td>{equipo.Nombre}</td>
                <td>{equipo.Ciudad}</td>
                <td>{equipo.Conferencia}</td>
                <td>{equipo.Division}</td>
                <td>
                  {/* Mostrar la imagen del logotipo */}
                  <img
                    src={getLogoUrl(equipo.Nombre)}
                    alt={`${equipo.Nombre} Logo`}
                    style={{ width: '90px', height: '80px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipos;
import React from 'react';
import styles from "./Home.module.css"; 
import SearchBar from './Search.js';
import { Link } from 'react-scroll';
import miImagen from '../imagenespagina/kobepensando.jpg';
<link
  href="https://fonts.googleapis.com/css2?family=PermanentMarker&display=swap"
  rel="stylesheet"
/>

const Home = () => {
  return (
    <div className={styles.home}>

      <SearchBar />
      <br />
      <br />
      <br />
      <img src={miImagen} alt="ImagenKobe" />
      <p>Esta es una página web realizada para la busqueda de datos relacionados con la temporada actual y con temporadas pasadas.< br/> Todo lo que solicites y requieras al alcance de un click</p>
      
    </div>  
   
  )
}

export default Home
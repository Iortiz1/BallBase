import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Navbar.module.css';
import { GiBasketballBasket } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { useScrollPosition } from "../Hooks/scrollPosition";

const Navbar = () => {
  const [NavbarOpen, setNavbarOpen] = useState(false);
  
  // Detecta el ancho y alto de la pantalla
  const [WindowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectDimension = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectDimension);
    WindowDimension.width > 800 && setNavbarOpen(false);
    return () => {
      window.removeEventListener('resize', detectDimension);
    };
  }, [WindowDimension]);

  const links = [
    {
      id: 1,
      link: "Home",
      section: "SeccionInicio",
    },
    {
      id: 2,
      link: "Jugadores",
      section: "SeccionJugadores",
    },
    {
      id: 3,
      link: "Equipos",
      section: "SeccionEquipos",
    },
    {
      id: 4,
      link: "Temporadas",
      section: "SeccionTemporadas",
    },
    {
      id: 5,
      link: "Contacto",
      section: "SeccionContacto",
    },
  ];

  const scrollPosition = useScrollPosition();

  return (
    <div className={
      NavbarOpen
        ? styles.NavOpen
        : scrollPosition > 0
          ? styles.navOnScroll
          : styles.Navbar
    }>
      {!NavbarOpen && <p className={styles.logo}>BallBase | Information</p>}
      {!NavbarOpen && WindowDimension.width < 800 ? (
        <GiBasketballBasket
          className={styles.iconocanasta}
          onClick={() => setNavbarOpen(!NavbarOpen)}
          size={60}
        />
      ) : WindowDimension.width < 800 && (
        <AiOutlineClose
          className={styles.iconocanasta}
          onClick={() => setNavbarOpen(!NavbarOpen)}
          size={35}
        />
      )}
      {
        NavbarOpen && (
          <ul className={styles.linksContainer}>
            {links.map(x => (
              <div key={x.id}>
                <ScrollLink
                  onClick={() => setNavbarOpen(false)}
                  to={x.section}
                  smooth
                  duration={500}
                  className={styles.navLink}
                >
                  {x.link === "Jugadores" ? "Jugadores" : x.link}
                </ScrollLink>
                <div className={styles.border}></div>
              </div>
            ))}
          </ul>
        )
      }
      {
        WindowDimension.width > 800 && (
          <ul className={styles.linksContainer}>
            {links.map(x => (
              <div key={x.id}>
                <ScrollLink
                  onClick={() => setNavbarOpen(false)}
                  to={x.section}
                  smooth
                  duration={500}
                  className={styles.navLink}
                >
                  {x.link === "Jugadores" ? "Jugadores" : x.link}
                </ScrollLink>
                <div className={styles.border}></div>
              </div>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default Navbar;
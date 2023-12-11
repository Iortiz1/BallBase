import React, { useState } from 'react';
import axios from 'axios';
import styles from './Search.module.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost/tfg/obtenerEquiposjugadores.php?term=${searchTerm}`);
      const limitedResults = response.data.slice(0, 8);
      setSearchResults(limitedResults); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className={styles.searchbarcontainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.searchinput}
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className={styles.searchbutton}>
          Buscar
        </button>
      </form>
      {/* Muestra los resultados de la búsqueda */}
      {searchResults.length > 0 && (
        <table className={styles.resultTable}>
          <thead>
            <tr>
              {/* Suponiendo que los resultados tienen propiedades similares */}
              {Object.keys(searchResults[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                {Object.values(result).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchBar;
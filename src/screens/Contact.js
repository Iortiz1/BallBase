import React, { useState } from 'react';
import styles from './Contact.module.css'; 

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted] = useState(false);

 
  return (
    <div className={styles.contactContainer}>
      <h1>Contacto</h1>
      {submitted ? (
        <p>¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</p>
      ) : (
        <form action='https://getform.io/f/2ac46174-da7b-4cbb-93d3-1becb43cbbde' method='POST'  className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Enviar Mensaje
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
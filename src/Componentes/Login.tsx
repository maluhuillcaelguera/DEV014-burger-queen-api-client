import React, { useState } from 'react';
import styles from '../Style/Login.module.css';
import { login } from '../Servicios/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      // Aquí puedes manejar el éxito del login, como redirigir al usuario o guardar el token
    } catch (error) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img src="path_to_logo_image" alt="Burger Queen Logo" className={styles.logo} />
        <h1 className={styles.title}>BURGER QUEEN</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styles from '../Style/Login.module.css';
import { login } from '../Servicios/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate  = useNavigate ();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      localStorage.setItem("token", response.accessToken);
      // Redirigir según el rol del usuario
      if (response.user.role === 'waiter') {
        navigate('/waiter');
      } else if (response.user.role === 'chef') {
        navigate('/chef');
      }
      
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError('URL no encontrada. Por favor, verifica la URL del API.');
      } else {
        setError('Credenciales inválidas. Inténtalo de nuevo.');
      }
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

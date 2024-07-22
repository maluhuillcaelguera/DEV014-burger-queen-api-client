import React from 'react';
import styles from '../Style/Login.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img src="path_to_logo_image" alt="Burger Queen Logo" className={styles.logo} />
        <h1 className={styles.title}>BURGER QUEEN</h1>
        <input type="email" placeholder="Gmail" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button className={styles.button}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;

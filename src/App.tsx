// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Componentes/Login';
import Waiter from './Componentes/Waiter';
import ChefPage from './Componentes/Chef';
import styles from './App.module.css'; // Importa el archivo de estilos

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/waiter" element={<Waiter />} />
        <Route path="/chef" element={<ChefPage />} />
      </Routes>
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import PublicRepositoriesPage from './pages/PublicRepositoriesPage';
import MyRepositoriesPage from './pages/MyRepositoriesPage';
import FavoritesPage from './pages/FavoritesPage';
import RepositoryDetailPage from './pages/RepositoryDetailPage';

import './App.css';

function App() {
  return (
    <Router>
      <Header />

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PublicRepositoriesPage />} />
          <Route path="/meus-repositorios" element={<MyRepositoriesPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/repositorios/:id" element={<RepositoryDetailPage />} />

          <Route path="*" element={
            <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h2 style={{ color: '#e74c3c' }}>Ops! Página Não Encontrada (404)</h2>
              <p style={{ color: '#555' }}>A URL que você tentou acessar não existe. Por favor, verifique o endereço.</p>
              <Link to="/" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold', marginTop: '20px', display: 'inline-block' }}>
                Voltar para o início
              </Link>
            </div>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { getFavoriteRepositorios } from '../api/repositorioApi';
import type { Repositorio } from '../types';
import RepositoryCard from '../components/RepositoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const FavoritesPage: React.FC = () => {
  const [repositorios, setRepositorios] = useState<Repositorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavoriteRepositorios();
        setRepositorios(data);
      } catch (err: any) {
        console.error("Erro ao buscar repositórios favoritos:", err);
        setError("Não foi possível carregar os repositórios favoritos. Verifique sua conexão e a API.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Meus Repositórios Favoritos</h2>

      {loading && <LoadingSpinner />}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {!loading && !error && repositorios.length === 0 && (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.1em' }}>
          Nenhum repositório marcado como favorito ainda. Marque alguns na página de detalhes!
        </p>
      )}

      {!loading && !error && repositorios.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {repositorios.map(repo => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
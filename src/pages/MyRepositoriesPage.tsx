import React, { useState, useEffect } from 'react';
import { getMyRepositorios } from '../api/repositorioApi'; 
import { type Repositorio } from '../types';
import RepositoryCard from '../components/RepositoryCard'; 
import LoadingSpinner from '../components/LoadingSpinner'; 

const MyRepositoriesPage: React.FC = () => {
  const [repositorios, setRepositorios] = useState<Repositorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const YOUR_GITHUB_USERNAME = "PetersonMB"; 

  useEffect(() => {
    const fetchMyRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyRepositorios(YOUR_GITHUB_USERNAME);
        setRepositorios(data);
      } catch (err: any) {
        console.error("Erro ao buscar meus repositórios:", err);
        setError(`Não foi possível carregar seus repositórios (${YOUR_GITHUB_USERNAME}).
                  Verifique se o backend está rodando e se o nome do proprietário está correto.`);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRepos();
  }, [YOUR_GITHUB_USERNAME]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Meus Repositórios ({YOUR_GITHUB_USERNAME})</h2>

      {loading && <LoadingSpinner />}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {!loading && !error && repositorios.length === 0 && (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.1em' }}>
          Nenhum repositório encontrado para "{YOUR_GITHUB_USERNAME}".
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

export default MyRepositoriesPage;
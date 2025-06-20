import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRepositorioById, toggleFavorite } from '../api/repositorioApi';
import type { Repositorio } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const RepositoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [repositorio, setRepositorio] = useState<Repositorio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavoriting, setIsFavoriting] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepoDetails = async () => {
    
      if (!id) {
        setError("ID do repositório não fornecido na URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
     
        const repoId = parseInt(id, 10);
        if (isNaN(repoId)) {
          setError("ID do repositório inválido. Por favor, use um ID numérico.");
          setLoading(false);
          return;
        }

        const data = await getRepositorioById(repoId);
        setRepositorio(data);
      } catch (err: any) {
        console.error("Erro ao buscar detalhes do repositório:", err);
        setError("Não foi possível carregar os detalhes do repositório. Verifique se o backend está rodando e o ID é válido.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [id]);

  
  const handleToggleFavorite = async () => {   
    if (!repositorio || isFavoriting) return;

    setIsFavoriting(true); 
    try {
      const updatedRepo = await toggleFavorite(repositorio.id); 
      setRepositorio(updatedRepo); 
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
      alert("Não foi possível alterar o status de favorito. Tente novamente.");
    } finally {
      setIsFavoriting(false);
    }
  };
 
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px', backgroundColor: '#fdeded', color: '#c0392b', margin: '20px auto', maxWidth: '600px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
        <h3>Erro!</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '15px', padding: '10px 15px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Voltar à Home
        </button>
      </div>
    );
  }

  if (!repositorio) {    
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Repositório não encontrado. O ID pode estar incorreto ou não existe na sua base de dados.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '15px', padding: '10px 15px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Voltar à Home
        </button>
      </div>
    );
  }

  const lastUpdateDate = new Date(repositorio.ultimaAtualizacao).toLocaleDateString('pt-BR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '30px auto', padding: '25px', border: '1px solid #e0e0e0', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '25px', fontSize: '2em', borderBottom: '2px solid #3498db', paddingBottom: '15px' }}>
        Detalhes do Repositório: {repositorio.nome}
      </h2>

      <div style={{ marginBottom: '15px', lineHeight: '1.6em' }}>
        <p><strong>Dono:</strong> {repositorio.donoDoRepositorio}</p>
        <p><strong>Descrição:</strong> {repositorio.descricao || 'Nenhuma descrição disponível.'}</p>
        <p><strong>Linguagem:</strong> {repositorio.linguagem || 'Não especificada.'}</p>
        <p><strong>Última Atualização:</strong> {lastUpdateDate}</p>
        <p>
          <strong>Link GitHub:</strong> <a href={repositorio.gitUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2980b9', textDecoration: 'none' }}>
            {repositorio.gitUrl}
          </a>
        </p>
      </div>

      <div style={{ marginBottom: '25px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <h3 style={{ color: '#34495e', marginBottom: '10px' }}>Contribuidores:</h3>
        {repositorio.contribuidores && repositorio.contribuidores.length > 0 ? (
          <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
            {repositorio.contribuidores.map((contributor, index) => (
              <li key={index}>{contributor}</li> 
            ))}
          </ul>
        ) : (
          <p>Nenhum contribuidor listado.</p>
        )}
      </div>

      <div style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <button
          onClick={handleToggleFavorite}
          disabled={isFavoriting}
          style={{
            padding: '12px 25px',
            fontSize: '1.1em',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: repositorio.favorito ? '#f39c12' : '#27ae60',
            color: '#fff',
            cursor: isFavoriting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s, opacity 0.2s',
            opacity: isFavoriting ? 0.7 : 1,
          }}
        >
          {isFavoriting ? 'Atualizando...' : (repositorio.favorito ? 'Remover dos Favoritos ⭐' : 'Marcar como Favorito ⭐')}
        </button>
        <button
          onClick={() => navigate(-1)} 
          style={{
            marginLeft: '15px',
            padding: '12px 25px',
            fontSize: '1.1em',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            color: '#555',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default RepositoryDetailPage;
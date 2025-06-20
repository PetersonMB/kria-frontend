import React from 'react';
import type { Repositorio } from '../types';  
import { Link } from 'react-router-dom'; 

interface RepositoryCardProps {
  repo: Repositorio; 
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {  
  const formattedDate = new Date(repo.ultimaAtualizacao).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <li style={{
      border: '1px solid #dcdcdc',
      borderRadius: '8px',
      marginBottom: '18px',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer'
    }}    
    onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
    onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >   
      <Link to={`/repositorios/${repo.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={{ color: '#3498db', marginBottom: '8px', fontSize: '1.5em' }}>{repo.nome}</h3>
      </Link>

      <p style={{ marginBottom: '5px' }}><strong>Dono:</strong> {repo.donoDoRepositorio}</p>
      <p style={{ marginBottom: '5px' }}><strong>Descrição:</strong> {repo.descricao || 'Nenhuma descrição disponível.'}</p>
      <p style={{ marginBottom: '5px' }}><strong>Linguagem:</strong> {repo.linguagem || 'Não especificada.'}</p>
      <p style={{ marginBottom: '10px' }}><strong>Última Atualização:</strong> {formattedDate}</p>

      <p style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>     
        <a href={repo.gitUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2980b9', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05em' }}>
          Ver no GitHub
        </a>        
        {repo.favorito && <span style={{ color: 'gold', fontSize: '1.8em', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>⭐ Favorito</span>}
      </p>
      
      {repo.contribuidores && Array.isArray(repo.contribuidores) && repo.contribuidores.length > 0 && (
        <p style={{ marginTop: '10px', fontSize: '0.95em', color: '#666' }}>
          <strong>Contribuidores:</strong> {repo.contribuidores.join(', ')}
        </p>
      )}
    </li>
  );
};

export default RepositoryCard;
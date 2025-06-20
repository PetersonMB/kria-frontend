import React, { useState, useEffect, useCallback } from 'react';
import { getAllPublicRepositorios, searchRepositorios } from '../api/repositorioApi'; 
import type { Repositorio, PagedResult } from '../types'; 
import RepositoryCard from '../components/RepositoryCard'; 
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Paginations';

const PublicRepositoriesPage: React.FC = () => { 
  const [repositorios, setRepositorios] = useState<Repositorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 


  const fetchRepos = useCallback(async (page: number, term: string) => {
    setLoading(true);
    setError(null);
    try {
      if (term) {       
        const data = await searchRepositorios(term);
        setRepositorios(data);
        setTotalPages(1); 
        setCurrentPage(1); 
      } else {       
        const pagedResult = await getAllPublicRepositorios(page, 10); 
        setRepositorios(pagedResult.items);
        setCurrentPage(pagedResult.pageNumber);
        setTotalPages(pagedResult.totalPages);
      }
    } catch (err: any) {
      console.error("Erro ao carregar repositórios:", err);
      setError("Não foi possível carregar os repositórios. Verifique sua conexão e a API backend.");
    } finally {
      setLoading(false);
    }
  }, []); 
 
  useEffect(() => {
    fetchRepos(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchRepos]);
  
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    setCurrentPage(1);
   
  };

 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Repositórios Públicos</h2>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Buscar por nome ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '70%', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1em' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#3498db', color: '#fff', fontSize: '1em', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
        >
          Buscar
        </button>
      </form>
      
      {loading && <LoadingSpinner />}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      
      {!loading && !error && repositorios.length === 0 && (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.1em' }}>
          Nenhum repositório encontrado para os critérios.
        </p>
      )}

   
      {!loading && !error && repositorios.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {repositorios.map(repo => (
            <RepositoryCard key={repo.id} repo={repo} /> 
          ))}
        </ul>
      )}
     
      {!searchTerm && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PublicRepositoriesPage;
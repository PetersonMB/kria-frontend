
import React from 'react';

interface PaginationProps {
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  if (totalPages <= 1) {
    return null;
  }
 
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '8px' }}>
      {/* Botão "Anterior" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} 
        style={{
          padding: '10px 15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f0f0f0',
          color: '#333',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        Anterior
      </button>

      {/* Botões para cada número de página */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '10px 15px',
            border: '1px solid #3498db',
            borderRadius: '5px',
            backgroundColor: page === currentPage ? '#3498db' : '#fff',
            color: page === currentPage ? '#fff' : '#3498db',
            fontWeight: page === currentPage ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'background-color 0.2s, color 0.2s',
          }}
        >
          {page}
        </button>
      ))}

      {/* Botão "Próxima" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} 
        style={{
          padding: '10px 15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f0f0f0',
          color: '#333',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
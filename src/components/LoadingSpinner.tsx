import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px', 
      fontSize: '1.2em',
      color: '#555',
      textAlign: 'center'
    }}>
      Carregando...
    </div>
  );
};

export default LoadingSpinner;
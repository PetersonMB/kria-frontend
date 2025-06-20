import React from 'react';
import { Link } from 'react-router-dom'; 

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: '#2c3e50', 
      padding: '20px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)', 
      marginBottom: '30px',
      textAlign: 'center'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'center', 
        gap: '30px'
      }}>       
        <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '1.2em', fontWeight: 'bold', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#3498db'}
              onMouseOut={(e) => e.currentTarget.style.color = '#ecf0f1'}>
          Repositórios Públicos
        </Link>
        <Link to="/meus-repositorios" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '1.2em', fontWeight: 'bold', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#3498db'}
              onMouseOut={(e) => e.currentTarget.style.color = '#ecf0f1'}>
          Meus Repositórios
        </Link>
        <Link to="/favoritos" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '1.2em', fontWeight: 'bold', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#3498db'}
              onMouseOut={(e) => e.currentTarget.style.color = '#ecf0f1'}>
          Favoritos
        </Link>        
      </nav>
    </header>
  );
};

export default Header;
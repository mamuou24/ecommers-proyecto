import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../store/useCartStore';

const Navbar = () => {
  const { cart, searchQuery, setSearchQuery } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Estilos manuales para asegurar que no se vean como links azules
  const navStyle = {
    backgroundColor: '#15803d', // Verde esmeralda
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '20px',
    fontSize: '1rem'
  };

  const badgeStyle = {
    backgroundColor: '#f97316',
    borderRadius: '50%',
    padding: '2px 8px',
    fontSize: '0.8rem',
    marginLeft: '5px'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, fontSize: '1.5rem', marginLeft: 0 }}>
        🍍 Antojos Tropicales
      </Link>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar fruta..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', borderRadius: '20px', border: 'none', marginRight: '20px' }}
        />
        <Link to="/gallery" style={linkStyle}>Galería</Link>
        <Link to="/cart" style={linkStyle}>
          🛒 Carrito <span style={badgeStyle}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { useCartStore } from '../../store/useCartStore';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'white'
    }}>
      {/* IMAGEN CONTROLADA */}
      <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{product.title}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#ea580c', fontSize: '1.2rem' }}>
            ${product.price.toLocaleString()}
          </span>
          <button 
            onClick={() => addToCart(product)}
            style={{ 
              background: '#16a34a', 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px', 
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
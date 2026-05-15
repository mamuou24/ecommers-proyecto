import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../../../mockdata/products';
import ProductCard from '../../molecules/ProductCard';
import { useCartStore } from '../../../store/useCartStore';

const Gallery = () => {
  const searchQuery = useCartStore((state) => state.searchQuery);
  
  // Filtrado de productos basado en la búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Configuración de Paginación
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- ESTILOS DEL BANNER ---
  const bannerStyle = {
    width: '100%',
    height: '350px',
    // Imagen de fondo profesional con overlay oscuro para que el texto resalte
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2000&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: '20px',
    marginBottom: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  };

  return (
    <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. BANNER ATRACTIVO */}
      <div style={bannerStyle}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          ¡Fruta Fresca en tu Puerta!
        </h1>
        <p style={{ fontSize: '1.4rem', marginTop: '10px', fontWeight: '300' }}>
          Seleccionamos lo mejor del campo colombiano para tu mesa.
        </p>
        <button style={{ 
          marginTop: '20px', 
          padding: '12px 30px', 
          backgroundColor: '#16a34a', 
          color: 'white', 
          border: 'none', 
          borderRadius: '30px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Ver Ofertas de Hoy
        </button>
      </div>

      {/* 2. TÍTULO Y CONTEO */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#14532d', margin: '0' }}>
          Nuestra Cosecha
        </h2>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          {filteredProducts.length} deliciosos productos encontrados para ti.
        </p>
      </div>

      {/* 3. GRID DE 3 COLUMNAS (Con respaldo CSS) */}
      {currentItems.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '35px' 
        }}>
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p style={{ fontSize: '1.5rem', color: '#999' }}>No encontramos la fruta que buscas...</p>
        </div>
      )}

      {/* 4. PAGINACIÓN */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', gap: '20px' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '10px 25px', borderRadius: '25px', border: '2px solid #16a34a', background: 'transparent', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer', opacity: currentPage === 1 ? 0.3 : 1 }}
          >
            Anterior
          </button>
          <span style={{ fontWeight: 'bold' }}>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: '10px 25px', borderRadius: '25px', border: '2px solid #16a34a', background: 'transparent', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer', opacity: currentPage === totalPages ? 0.3 : 1 }}
          >
             Siguiente
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
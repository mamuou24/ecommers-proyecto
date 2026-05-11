import React from 'react';
import { products } from '../mockdata/products';
import ProductCard from '../components/molecules/ProductCard';

// Componente principal de la página de inicio, que muestra una cuadrícula de productos utilizando el componente ProductCard para cada uno. La cuadrícula es responsiva, adaptándose a diferentes tamaños de pantalla para una experiencia óptima en dispositivos móviles, tabletas y computadoras de escritorio.

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-center text-green-900 mb-8">
        Nuestros Antojos Tropicales
      </h1>
      
      {/* Grid Responsivo: 1 columna en móvil, 2 en tablet, 4 en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
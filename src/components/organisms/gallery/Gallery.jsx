import React, { useState, useMemo } from 'react';
import { products } from '../../../mockdata/products';
import ProductCard from '../../molecules/ProductCard';
import { useCartStore } from '../../../store/useCartStore';

const Gallery = () => {
  // 1. Acceder al estado global de búsqueda desde Zustand [cite: 110, 121]
  const searchQuery = useCartStore((state) => state.searchQuery);

  // 2. Lógica de Filtrado en tiempo real [cite: 26, 31, 161]
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 3. Lógica de Paginación (6-8 por página según la guía) [cite: 25, 162-163]
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredProducts.slice(firstIndex, lastIndex);

  // Reiniciar a la página 1 si el usuario busca algo nuevo
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <section className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-green-900">Nuestra Cosecha</h2>
          <p className="text-gray-600">Fruta fresca seleccionada para ti</p>
        </div>
        
        {/* Contador de resultados */}
        <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium">
          {filteredProducts.length} productos encontrados
        </span>
      </div>

      {/* 4. Grid de Productos [cite: 157] */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-inner">
          <span className="text-5xl mb-4 block">🍋‍🟩</span>
          <h3 className="text-xl font-semibold text-gray-700">¡Ups! No encontramos ese antojo</h3>
          <p className="text-gray-500">Prueba con otra fruta o ingrediente.</p>
        </div>
      )}

      {/* 5. Controles de Paginación [cite: 204] */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Anterior
          </button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === i + 1 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'hover:bg-green-50 text-green-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
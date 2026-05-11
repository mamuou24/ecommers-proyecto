//Mostrar la información de cada producto en una tarjeta atractiva, con imagen, título, descripción y precio formateado en pesos colombianos. Además, incluir un botón para añadir el producto al carrito de compras.
import React from 'react';

const ProductCard = ({ product }) => {
  // Formateador para pesos colombianos
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-800 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-orange-600">
            {formatter.format(product.price)}
          </span>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={() => console.log('Añadido:', product.title)}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
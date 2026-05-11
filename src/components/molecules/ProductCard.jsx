//Mostrar la información de cada producto en una tarjeta atractiva, con imagen, título, descripción y precio formateado en pesos colombianos. Además, incluir un botón para añadir el producto al carrito de compras.
import React from 'react';
import { useCartStore } from '../../store/useCartStore'; // Importar el store

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart); // Obtener la función

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-orange-600">{formatter.format(product.price)}</span>
          <button 
            onClick={() => addToCart(product)} // Llamada real al store
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React from 'react';
import { Link } from 'react-router-dom'; // Para la navegación SPA [cite: 11, 74]
import { useCartStore } from "../../../store/useCartStore";

const Navbar = () => {
  // Obtenemos el array del carrito del store
  const cart = useCartStore((state) => state.cart);
  
  // Calculamos el total de items (sumando las cantidades)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Nombre */}
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span>🍍</span> Antojos Tropicales
        </Link>

        {/* Links y Carrito */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-orange-300 transition-colors">Inicio</Link>
          
          {/* Botón del Carrito con Contador */}
          <Link to="/cart" className="relative p-2 bg-green-800 rounded-full hover:bg-green-900 transition-colors">
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-green-700">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
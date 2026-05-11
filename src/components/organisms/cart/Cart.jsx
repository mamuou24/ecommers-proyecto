import React from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Tu carrito está vacío 🍎</h2>
        <p className="text-gray-500 my-4">¿Qué tal si agregas unos antojos tropicales?</p>
        <Link to="/gallery" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Ir a la Galería
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-900 mb-8 border-b pb-4">Tu Carrito de Compras</h2>
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{formatter.format(item.price)} c/u</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Controles de cantidad */}
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 hover:bg-gray-100 text-xl font-bold"
                >-</button>
                <span className="px-3 font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 hover:bg-gray-100 text-xl font-bold"
                >+</button>
              </div>

              {/* Precio Subtotal */}
              <span className="font-bold text-green-700 min-w-[100px] text-right">
                {formatter.format(item.price * item.quantity)}
              </span>

              {/* Botón eliminar */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen Final */}
      <div className="mt-10 bg-green-50 p-6 rounded-2xl border-2 border-green-100">
        <div className="flex justify-between items-center text-xl font-bold text-green-900">
          <span>Total a pagar:</span>
          <span className="text-2xl text-orange-600">{formatter.format(getTotalPrice())}</span>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={clearCart}
            className="flex-1 border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-50 transition font-semibold"
          >
            Vaciar Carrito
          </button>
          <Link 
            to="/checkout"
            className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold text-center"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
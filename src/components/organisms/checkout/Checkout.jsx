import React, { useState } from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const handlePurchase = () => {
    setIsFinished(true);
    setTimeout(() => {
      clearCart();
      navigate('/gallery');
    }, 3000); // 3 segundos de éxito y redirige
  };

  if (isFinished) {
    return (
      <div className="text-center py-20 animate-bounce">
        <h2 className="text-4xl mb-4">🎉</h2>
        <h2 className="text-2xl font-bold text-green-700">¡Pedido Realizado con Éxito!</h2>
        <p className="text-gray-600 mt-2">Tus frutas están en camino...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen de tu Pedido</h2>
      
      <div className="divide-y mb-6">
        {cart.map((item) => (
          <div key={item.id} className="py-3 flex justify-between">
            <span>{item.title} (x{item.quantity})</span>
            <span className="font-semibold">{formatter.format(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between text-xl font-extrabold text-green-900">
        <span>Total Final:</span>
        <span>{formatter.format(getTotalPrice())}</span>
      </div>

      <button 
        onClick={handlePurchase}
        className="w-full mt-8 bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg"
      >
        Confirmar y Pagar
      </button>
      
      <p className="text-center text-xs text-gray-400 mt-4">
        * Al confirmar, aceptas los términos de Antojos Tropicales.
      </p>
    </div>
  );
};

export default Checkout;
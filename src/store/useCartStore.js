import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      
      // Agregar producto o incrementar cantidad
      addToCart: (product) => set((state) => {
        const itemInCart = state.cart.find((item) => item.id === product.id);
        if (itemInCart) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      // Eliminar producto
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),

      // Limpiar carrito
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // Nombre para el localStorage 
    }
  )
);
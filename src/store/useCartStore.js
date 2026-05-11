import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // --- ESTADO ---
      cart: [],
      searchQuery: '',

      // --- ACCIONES DEL BUSCADOR ---
      // Permite que el buscador en el Navbar afecte a la Galería en tiempo real [cite: 26, 31]
      setSearchQuery: (query) => set({ searchQuery: query }),

      // --- ACCIONES DEL CARRITO ---
      
      // Agregar producto o incrementar cantidad si ya existe [cite: 27, 205]
      addToCart: (product) => {
        const { cart } = get();
        const index = cart.findIndex((item) => item.id === product.id);

        if (index !== -1) {
          // Si el producto ya está, creamos una copia del array y aumentamos la cantidad
          const newCart = [...cart];
          newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
          set({ cart: newCart });
        } else {
          // Si es nuevo, lo agregamos con cantidad inicial de 1
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      // Eliminar un producto por completo del carrito
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      // Actualizar la cantidad manualmente (útil para botones +/- en la vista del Carrito)
      updateQuantity: (productId, amount) => {
        const newCart = get().cart.map((item) => {
          if (item.id === productId) {
            const newQty = Math.max(1, item.quantity + amount); // Evita cantidades menores a 1
            return { ...item, quantity: newQty };
          }
          return item;
        });
        set({ cart: newCart });
      },

      // Limpiar todo el carrito (usado al finalizar la compra)
      clearCart: () => set({ cart: [] }),

      // --- CÁLCULOS (Getters) ---
      
      // Obtener el precio total acumulado [cite: 60, 205]
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // Obtener la cantidad total de productos para el badge del Navbar
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      // Configuración de persistencia [cite: 155]
      name: 'antojos-tropicales-storage', // Nombre de la clave en localStorage
    }
  )
);
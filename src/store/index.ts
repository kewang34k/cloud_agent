import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
  isNew?: boolean;
  isHot?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  login: (email: string) => void;
  logout: () => void;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      login: (email) => set({ user: { id: Date.now().toString(), email } }),
      logout: () => set({ user: null }),
      addToCart: (product, size) => set((state) => {
        const existingItem = state.cart.find(item => item.product.id === product.id && item.size === size);
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return {
          cart: [...state.cart, { id: `${product.id}-${size}`, product, size, quantity: 1 }]
        };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
      })),
      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'lumiere-storage',
    }
  )
);

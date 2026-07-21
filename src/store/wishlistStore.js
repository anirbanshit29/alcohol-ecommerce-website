import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.find((item) => item.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      toggleItem: (product) => {
        const exists = get().items.find((item) => item.id === product.id);
        if (exists) {
          get().removeItem(product.id);
          return false; // removed
        }
        get().addItem(product);
        return true; // added
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'sipandsavor-wishlist',
    }
  )
);

export default useWishlistStore;

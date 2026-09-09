import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/features/products/types';

interface FavoriteState {
  favorites: Product[];
  recentlyViewed: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
  removeFavorite: (id: number) => void;
  addRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyViewed: [],

      toggleFavorite: (product: Product) => {
        const { favorites } = get();
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            favorites: [product, ...favorites],
          });
        }
      },

      isFavorite: (id: number) => {
        return get().favorites.some((item) => item.id === id);
      },

      removeFavorite: (id: number) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== id),
        });
      },

      addRecentlyViewed: (product: Product) => {
        const { recentlyViewed } = get();
        // Filter out existing occurrence to move it to the top
        const filtered = recentlyViewed.filter((item) => item.id !== product.id);
        // Keep max 10 most recent products
        const updated = [product, ...filtered].slice(0, 10);
        set({ recentlyViewed: updated });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },
    }),
    {
      name: 'app-product-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      isWishlisted: (productId) => get().items.some((item) => item.id === productId),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id)
          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          }
        }),
    }),
    {
      name: 'chronora_wishlist',
    },
  ),
)

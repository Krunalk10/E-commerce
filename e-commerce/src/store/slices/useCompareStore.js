import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],
      canAddMore: () => get().items.length < 3,
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id)

          if (exists) {
            return {
              items: state.items.filter((item) => item.id !== product.id),
            }
          }

          if (state.items.length >= 3) {
            return state
          }

          return {
            items: [...state.items, product],
          }
        }),
    }),
    {
      name: 'chronora_compare',
    },
  ),
)

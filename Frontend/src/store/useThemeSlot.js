import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeSlot = create(
  persist(
    (set) => ({
      theme: "forest",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "user-theme", // localStorage key
    }
  )
);

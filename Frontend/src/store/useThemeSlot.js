import { create } from 'zustand'

export const useThemeSlot = create((set) => ({
  theme: "forest",
  setTheme: (theme) => set({ theme }),
}));

import { create } from "zustand";

const useFilterStore = create((set) => ({
  projectFilters: {
    skills: [],
    labs: [],
    keywords: [],
    status: [],
  },
  setProjectFilters: (newFilters) => set({ projectFilters: newFilters }),
  clearProjectFilters: () => set({ projectFilters: { interestsArray: [], skillsArray: [], labsArray: [], keywordsArray: [], statusArray: [] } }),

  userFilters: {
    interests: [],
    skills: [],
    labs: [],
  },
  setUserFilters: (newFilters) => set({ userFilters: newFilters }),
  clearUserFilters: () => set({ userFilters: { interestsArray: [], skillsArray: [], labsArray: [] } }),

  productFilters: {
    brand: [],
    type: [],
  },
  setProductFilters: (newFilters) => set({ productFilters: newFilters }),
  clearProductFilters: () => set({ productFilters: { brand: [], type: [] } }),
}));

export default useFilterStore;

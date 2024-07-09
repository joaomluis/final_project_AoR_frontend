import { create } from "zustand";

const useEditProjectStore = create((set) => ({
  projectUsers: [],
  setProjectUsers: (value) => set(() => ({ projectUsers: value })),
  projectResources: [],
  setProjectResources: (value) => set(() => ({ projectResources: value })),
  projectKeywords: [],
  addProjectKeyword: (keyword) => set((state) => ({ projectKeywords: [...state.projectKeywords, keyword] })),
  removeProjectKeyword: (keyword) =>
    set((state) => ({
      projectKeywords: state.projectKeywords.filter((k) => k.id !== keyword.id),
    })),
  setProjectKeywords: (value) => set(() => ({ projectKeywords: value })),
  projectSkills: [],
  addProjectSkill: (skill) => set((state) => ({ projectSkills: [...state.projectSkills, skill] })),
  removeProjectSkill: (skill) =>
    set((state) => ({
      projectSkills: state.projectSkills.filter((s) => s !== skill),
    })),
  setProjectSkills: (value) => set(() => ({ projectSkills: value })),

  cleanStore: () =>
    set(() => ({
      projectUsers: [],
      projectResources: [],
      projectKeywords: [],
      projectSkills: [],
    })),
  allKeywords: [],
  // updateSkills: (projectKeywords) => set({ projectKeywords }), //new action

  setAllKeywords: (value) => set(() => ({ allKeywords: value })),
  // addKeywords: (keyword) => set((state) => ({ projectKeywords: [...state.projectKeywords, keyword] })),
  // removeKeywords: (keyword) =>
  //   set((state) => ({
  //     projectKeywords: state.allKeywords.filter((k) => k.id !== keyword.id),
  //   })),
  addKeywordToAll: (keyword) => set((state) => ({ allKeywords: [...state.allKeywords, keyword] })),
  setAllSkills: (value) => set(() => ({ allSkills: value })),
}));

export default useEditProjectStore;

import { create } from "zustand";

const useEditProjectStore = create((set) => ({
  projectUsers: [],
  setProjectUsers: (value) => set(() => ({ projectUsers: value })),
  projectResources: [],
  setProjectResources: (value) => set(() => ({ projectResources: value })),
  projectKeywords: [],
  addProjectKeyword: (keyword) =>
    set((state) => ({ projectKeywords: [...state.projectKeywords, keyword] })),
  removeProjectKeyword: (keyword) =>
    set((state) => ({
      projectKeywords: state.projectKeywords.filter((k) => k !== keyword),
    })),
  projectSkills: [],
  addProjectSkill: (skill) =>
    set((state) => ({ projectSkills: [...state.projectSkills, skill] })),
  removeProjectSkill: (skill) =>
    set((state) => ({
      projectSkills: state.projectSkills.filter((s) => s !== skill),
    })),

  cleanStore: () =>
    set(() => ({
      projectUsers: [],
      projectResources: [],
      projectKeywords: [],
      projectSkills: [],
    })),
}));

export default useEditProjectStore;

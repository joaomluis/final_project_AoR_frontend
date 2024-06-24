import { create } from "zustand";

const useCreateProjectStore = create((set) => ({
  projectName: "",
  setProjectName: (value) => set(() => ({ projectName: value })),
  description: "",
  setDescription: (value) => set(() => ({ description: value })),
  lab: "",
  setLab: (value) => set(() => ({ lab: value })),
  startDate: "",
  setStartDate: (value) => set(() => ({ startDate: value })),
  endDate: "",
  setEndDate: (value) => set(() => ({ endDate: value })),
  projectUsers: [],
  setProjectUsers: (value) => set(() => ({ projectUsers: value })),
  projectResources: [],
  setProjectResources: (value) => set(() => ({ projectResources: value })),
  projectKeywords: [],
  addProjectKeyword: (keyword) => set((state) => ({ projectKeywords: [...state.projectKeywords, keyword] })),
  removeProjectKeyword: (keyword) => set((state) => ({ projectKeywords: state.projectKeywords.filter(k => k !== keyword) })),
  projectSkills: [],
  addProjectSkill: (skill) => set((state) => ({ projectSkills: [...state.projectSkills, skill] })),
  removeProjectSkill: (skill) => set((state) => ({ projectSkills: state.projectSkills.filter(s => s !== skill) })),

  cleanStore: () => set(() => ({
    projectName: '',
    description: '',
    lab: '',
    startDate: '',
    endDate: '',
    projectUsers: [],
    projectResources: [],
    projectKeywords: [],
    projectSkills: [],
  })),
}));

export default useCreateProjectStore;

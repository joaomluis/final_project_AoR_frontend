import {create} from 'zustand';

const initialState = {
  projectName: '',
  description: '',
  lab: null,
  startDate: null,
  endDate: null,
  projectUsers: [],
  projectResources: [],
  projectKeywords: [],
  projectSkills: [],
};

const useCreateProjectStore = create((set) => ({
  ...initialState, 
  setProjectName: (value) => set(() => ({ projectName: value })),
  setDescription: (value) => set(() => ({ description: value })),
  setLab: (value) => set(() => ({ lab: value })), 
  setStartDate: (value) => set(() => ({ startDate: value })),
  setEndDate: (value) => set(() => ({ endDate: value })),
  setProjectUsers: (value) => set(() => ({ users: value })), 
  setProjectResources: (value) => set(() => ({ resources: value })),
  setProjectKeywords: (value) => set(() => ({ keywords: value })),
  addProjectKeyword: (keyword) => set((state) => ({ projectKeywords: [...state.projectKeywords, keyword] })),
  removeProjectKeyword: (keyword) => set((state) => ({ projectKeywords: state.projectKeywords.filter(k => k !== keyword) })),
  setProjectSkills: (value) => set(() => ({ skills: value })),
  reset: () => set(() => ({ ...initialState })), 
}));

export default useCreateProjectStore;
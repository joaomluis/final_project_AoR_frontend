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
}));

export default useCreateProjectStore;

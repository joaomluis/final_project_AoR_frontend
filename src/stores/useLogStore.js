import { create } from "zustand";
const useLogStore = create((set) => ({
  logs: [],
  setLogs: (logs) => set({ logs }),
  addLog: (logs) => set((state) => ({ logs: [logs, ...state.logs] })),

  addLogPage: (logs) => set((state) => ({ logs: [...state.logs, ...logs] })),
  clear: () => set({ logs: [] }),
}));

export default useLogStore;

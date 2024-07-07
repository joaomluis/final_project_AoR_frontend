import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  addMessagePage: (messages) => set((state) => ({ messages: [...messages, ...state.messages] })),
  clear: () => set({ messages: [], activeTab: "4", hasNewItems: false }),

  activeTab: "4",
  setActiveTab: (activeTab) => set({ activeTab }),
  hasNewItems: false,
  setHasNewItems: (hasNewItems) => set({ hasNewItems }),
}));

export default useMessageStore;

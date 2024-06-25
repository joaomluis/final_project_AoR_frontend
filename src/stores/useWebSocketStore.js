import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const webSocketStore = create(
  persist(
    (set, get) => ({
      socket: null,

      setSocket: (socket) => set({ socket }),
    }),
    {
      name: "socketstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

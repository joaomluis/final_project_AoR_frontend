import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const webSocketStore = create(
  persist(
    (set, get) => ({
      socket: null,

      setSocket: (socket) => set({ socket }),
      send(message) {
        const { socket } = get();
        if (socket) {
          socket.send(message);
        }
      },
    }),
    {
      name: "socketstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

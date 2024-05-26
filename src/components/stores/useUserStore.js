//Our store is called useUserStore and is created using
//function create imported from zustand.
//The store has one state variable called username and a function called updateName
// to receive new value for the state variable and update it.
//In this code, we also use persist to persistently save our store's data.
//Persist is imported from zustand/middleware.
//In this example, we selected sessionStorage as the place to persist the store.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//define the store
export const useUserStore = create(
  persist(
    (set) => ({
      // username: "",
      token: "",
      skills: [],

      updateSkills: (skills) => set({ skills }), //new action
      addSkill: (skill) =>
        set((state) => ({ skills: [...state.skills, skill] })),
      updateToken: (token) => set({ token }), //new action
    }),
    {
      name: "userstore", //name of the storage
      storage: createJSONStorage(() => sessionStorage), //storage type
    }
  )
);

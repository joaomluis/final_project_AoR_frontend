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
      token: "f16abf18-f0d6-43f1-9dd8-50d3adcca4e8",
      email: "admin@admin",
      skills: [],
      allSkills: [],
      skillTypes: [],

      updateSkillTypes: (skillTypes) => set({ skillTypes }),
      updateEmail: (email) => set({ email }), //new action
      updateSkills: (skills) => set({ skills }), //new action
      updateAllSkills: (allSkills) => set({ allSkills }), //new action
      addSkill: (skill) =>
        set((state) => ({ skills: [...state.skills, skill] })),
      removeSkill: (skill) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== skill.id),
        })),
      updateToken: (token) => set({ token }), //new action
    }),
    {
      name: "userstore", //name of the storage
      storage: createJSONStorage(() => sessionStorage), //storage type
    }
  )
);

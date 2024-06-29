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
      email: "",
      privateProfile: "",
      skills: [],
      allSkills: [],
      skillTypes: [],
      interests: [],
      allInterests: [],
      myOwnProjects: [],
      sendCount: 0,

      unreadEmails: 0,

      //notifications:
      notifications: [],
      unreadNotifications: 0,
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
      addNotifications: (newNotifications) => set((state) => ({ notifications: [...state.notifications, ...newNotifications] })),
      markNotificationAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
        })),

      currentPage: 1, // Valor inicial para o número da página
      setCurrentPage: (page, token) => set({ currentPage: page, token: token }),

      //addNew mail:
      addSendMail: () => set((state) => ({ sendCount: state.sendCount + 1 })),
      addMail: () => set((state) => ({ unreadEmails: state.unreadEmails + 1 })),
      updateUnreadEmails: (unreadEmails) => set({ unreadEmails }),
      updateMailsFirstPage: (mailsFirstPage) => set({ mailsFirstPage }),

      updateUnreadNotifications: (unreadNotifications) => set({ unreadNotifications }),

      readMail: () => set((state) => ({ unreadEmails: state.unreadEmails - 1 })),

      updateMyOwnProjects: (myOwnProjects) => set({ myOwnProjects }),

      updatePrivateProfile: (privateProfile) => set({ privateProfile }),

      updateEmail: (email) => set({ email: email }), //new action
      updateToken: (token) => set({ token: token }), //new action

      updateInterests: (interests) => set({ interests }),
      updateAllInterests: (allInterests) => set({ allInterests }),
      addInterest: (interest) => set((state) => ({ interests: [...state.interests, interest] })),
      addInterestToAll: (interest) => set((state) => ({ allInterests: [...state.allInterests, interest] })),
      removeInterest: (interest) =>
        set((state) => ({
          interests: state.interests.filter((s) => s.id !== interest.id),
        })),

      updateSkillTypes: (skillTypes) => set({ skillTypes }),
      updateSkills: (skills) => set({ skills }), //new action
      updateAllSkills: (allSkills) => set({ allSkills }), //new action
      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      addSkillToAll: (skill) => set((state) => ({ allSkills: [...state.allSkills, skill] })),
      removeSkill: (skill) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== skill.id),
        })),
      logout() {
        set({ token: "" });
      },
    }),
    {
      name: "userstore", //name of the storage
      storage: createJSONStorage(() => sessionStorage), //storage type
    }
  )
);

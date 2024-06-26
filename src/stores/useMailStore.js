import { createStore } from "zustand";

export const useMailStore = createStore((set) => ({
  emails: [],
  unreadCount: 0,

  setUnreadCount: (unreadCount) =>
    set((state) => ({
      unreadCount,
    })),

  readMail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) => {
        if (email.id === id) {
          return { ...email, read: true };
        }
        return email;
      }),
    })),

  deleteMail: (id) =>
    set((state) => ({
      emails: state.emails.filter((email) => email.id !== id),
    })),
}));

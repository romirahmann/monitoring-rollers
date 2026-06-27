import { create } from "zustand";

export const UserStore = create((set) => ({
  users: [],
  userById: null,

  setUser: (users) => set({ users }),
  setUserById: (data) =>
    set({
      userById: data,
    }),
}));

import { create } from "zustand";

export const useRoleStore = create((set) => ({
  roles: null,
  setRoles: (roles) => set({ roles }),
}));

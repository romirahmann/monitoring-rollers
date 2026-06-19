import { create } from "zustand";

export const useHistoryStore = create((set) => ({
  histories: [],
  historyById: [],
  historyByCategoryId: [],

  setHistory: (data) =>
    set({
      histories: data,
    }),

  setHistoryById: (data) => {
    set({
      historyById: data,
    });
  },

  setHistoryByCategory: (data) => {
    set({
      historyByCategoryId: data,
    });
  },
}));

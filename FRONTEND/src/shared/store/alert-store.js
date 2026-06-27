import { create } from "zustand";

let timer;

export const useAlertStore = create((set) => ({
  open: false,
  type: "success",
  message: "",

  showAlert: ({ type = "success", message = "", duration = 3000 }) => {
    clearTimeout(timer);

    set({
      open: true,
      type,
      message,
    });

    timer = setTimeout(() => {
      set({
        open: false,
        message: "",
      });
    }, duration);
  },

  closeAlert: () => {
    clearTimeout(timer);

    set({
      open: false,
      message: "",
    });
  },
}));

import { useNavigate } from "react-router-dom";
import { useAlertStore } from "../../../store/alert-store.js";
import { FormLogin } from "../components/FormLogin";
import { useLoading } from "../../../store/loading.js";

import { useAuthStore } from "../store/auth-store.js";

export const LoginPage = () => {
  const { showAlert } = useAlertStore();
  const setUser = useAuthStore((state) => state.setUser);
  const navigasi = useNavigate();

  const onSubmit = (data) => {
    if (!data || data.length < 0) {
      showAlert({
        type: "error",
        message: "Login failed, please try again latter!",
      });
      return;
    }

    setUser(data);

    showAlert({
      type: "success",
      message: "Login successful!",
    });

    navigasi("/");
  };
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800  rounded-3xl p-8 shadow-2xl">
          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Monitoring</h1>

            <h3 className="text-2xl font-semibold text-white ">
              Rollers System
            </h3>

            <p className="text-zinc-400 mt-4 text-sm">
              Login to continue accessing your dashboard.
            </p>
          </div>

          <FormLogin onSubmit={onSubmit} />

          {/* Footer */}
          <p className="text-center text-zinc-500 text-sm mt-8">
            © 2026 IT. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

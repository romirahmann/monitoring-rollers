// import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormLogin } from "../components/FormLogin.jsx";
import { useAlertStore } from "../../shared/store/alert-store.js";
import { useAuthStore } from "../store/auth.store.js";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlertStore();
  const { setUser } = useAuthStore((state) => state);

  const handleSubmit = (data) => {
    setUser(data);
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className=" max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-12">
            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10 flex flex-col justify-center text-white">
              <h1 className="text-5xl font-bold leading-tight">
                Monitoring
                <br />
                Rollers System
              </h1>

              <p className="mt-6 max-w-md text-lg text-blue-100">
                Monitor machine performance, rollers, and operational roller
                status in real-time.
              </p>

              <div className="flex gap-4 mt-12">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md px-6 py-4">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-blue-100">Monitoring</p>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-md px-6 py-4">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-blue-100">Visibility</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

                <p className="mt-2 text-zinc-400">
                  Login to continue accessing your dashboard
                </p>
              </div>

              <FormLogin onSubmit={handleSubmit} />
              {/* Footer */}
              <p className="mt-8 text-center text-sm text-zinc-500">
                © 2026 IT Department. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

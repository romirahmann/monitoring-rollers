import { useState } from "react";
import { api } from "../../../shared/api/axios.js";

export function FormLogin({ onSubmit }) {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    try {
      res = await api.post("/auth/login", formLogin);
      onSubmit(res.data);
    } catch (error) {
      console.error("Login failed:", error);
      onSubmit(res);
    }
  };

  return (
    <>
      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* username */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">Username</label>

          <input
            type="text"
            placeholder="itpadama"
            name="username"
            value={formLogin.username}
            onChange={handleChange}
            className="
                  w-full
                  bg-zinc-950
                  border
                  border-zinc-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  transition
                "
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-zinc-300">Password</label>

            {/* <button
              type="button"
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              Forgot?
            </button> */}
          </div>

          <input
            type="password"
            placeholder="••••••••"
            name="password"
            value={formLogin.password}
            onChange={handleChange}
            className="
                  w-full
                  bg-zinc-950
                  border
                  border-zinc-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  transition
                "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
                w-full
                bg-white
                text-black
                font-semibold
                py-3
                rounded-xl
                hover:opacity-90
                transition
                active:scale-[0.98]
              "
        >
          Sign In
        </button>
      </form>
    </>
  );
}

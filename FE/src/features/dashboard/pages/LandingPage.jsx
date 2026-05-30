import { useNavigate } from "react-router-dom";
import { TopBar } from "../../../shared/components/topbar.jsx";
import { useAuthStore } from "../../auth/store/auth-store.js";
import { signout } from "../../auth/api/logout.js";
import { useAlertStore } from "../../../store/alert-store.js";
import { useCategories } from "../hooks/use-category.js";
import { useCategoriesStore } from "../store/categories-store.js";

export function LandingPage() {
  useCategories();
  const categories = useCategoriesStore((state) => state.categories);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { showAlert } = useAlertStore();

  const signOut = async () => {
    logout();
    signout();
    showAlert({ type: "success", message: "Logout Successfully!" });
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="max-w-full  ">
        <div className="flex gap-3 px-10 lg:px-36 justify-between p-3 border-b border-gray-400">
          <h1 className="font-bold text-2xl uppercase">Monitoring Rollers</h1>
          <button
            onClick={() => signOut()}
            className="btn bg-red-800 px-3 py-1 rounded-md text-white hover:bg-red-700"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <main className="flex items-center justify-center px-6 py-2">
        <div className=" w-full max-w-7xl flex flex-col gap-3 ">
          {/* CARD PRINTING */}

          {categories &&
            categories.map((category) => (
              <button
                key={`ctgry-${category.id}`}
                onClick={() =>
                  navigate(`/machine-page/${category.name.toLowerCase()}`)
                }
                className="
              group relative overflow-hidden rounded-3xl
              h-[420px] cursor-pointer
              grayscale hover:grayscale-0
              transition-all duration-500
              shadow-lg hover:shadow-2xl text-left
            "
              >
                {/* Background Image */}
                <img
                  src="https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200&auto=format&fit=crop"
                  alt="Printing"
                  className="absolute inset-0 h-full w-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-end p-8">
                  <div>
                    <h1
                      className="
                    text-5xl font-black tracking-wide
                    bg-gradient-to-r from-white via-gray-200 to-gray-400
                    bg-clip-text text-transparent
                  "
                    >
                      {category.name}
                    </h1>

                    <p className="mt-3 text-sm text-gray-200">
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </main>
    </div>
  );
}

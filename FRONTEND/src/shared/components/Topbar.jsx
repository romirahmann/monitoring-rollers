import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../features/Settings/Users/stores/auth-store.js";

export function Topbar({ setOpen }) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="
              lg:hidden
              h-10 w-10
              flex items-center justify-center
              rounded-xl
              hover:bg-slate-100
            "
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          </div>
        </div>

        {/* Center Search */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div
            className="
              flex items-center gap-2
              w-full max-w-md
              px-3 py-2

              bg-slate-100
              border border-slate-200
              rounded-xl
            "
          >
            <Search size={16} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                bg-transparent
                outline-none
                text-sm
                text-slate-700
                placeholder:text-slate-400
              "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            className="
              relative
              h-10 w-10
              flex items-center justify-center
              rounded-xl
              hover:bg-slate-100
            "
          >
            <Bell size={18} className="text-slate-600" />

            <span
              className="
                absolute
                top-2 right-2
                h-2 w-2
                rounded-full
                bg-red-500
              "
            />
          </button>

          <button
            className="
              flex items-center gap-3
              px-2 py-2
              rounded-xl
              hover:bg-slate-100
            "
          >
            <div className="h-9 w-9 rounded-full bg-blue-600" />

            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900">
                {user.username}
              </p>

              <p className="text-xs text-slate-500">Production Team</p>
            </div>

            <ChevronDown size={16} className="hidden sm:block text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}

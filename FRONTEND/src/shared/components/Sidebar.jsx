import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { menuRoutes } from "../../app/menu.routes.js";

export function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const [openedMenu, setOpenedMenu] = useState("");

  useEffect(() => {
    const currentParent = menuRoutes.find((menu) =>
      menu.children?.some((child) => child.path === location.pathname),
    );

    if (currentParent) {
      setOpenedMenu(currentParent.label);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden
          ${open ? "block" : "hidden"}
        `}
      />

      <aside
        className={`
          fixed lg:static z-50
          h-screen w-64
          bg-white
          border-r border-slate-200

          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <div>
              <h1 className="font-semibold text-slate-900">Monitoring</h1>

              <p className="text-xs text-slate-500">Rollers System</p>
            </div>

            <button onClick={() => setOpen(false)} className="lg:hidden">
              <X size={18} />
            </button>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-slate-400">
              Navigation
            </p>

            <div className="space-y-1">
              {menuRoutes.map((menu) => {
                const Icon = menu.icon;
                const hasChildren = menu.children?.length > 0;

                if (!hasChildren) {
                  return (
                    <NavLink
                      key={menu.label}
                      to={menu.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        transition-all

                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-slate-700 hover:bg-slate-100"
                        }
                      `
                      }
                    >
                      <Icon size={18} />
                      <span>{menu.label}</span>
                    </NavLink>
                  );
                }

                const isOpened = openedMenu === menu.label;

                return (
                  <div key={menu.label}>
                    <button
                      onClick={() => setOpenedMenu(isOpened ? "" : menu.label)}
                      className="
                        w-full
                        flex
                        items-center
                        justify-between
                        px-4
                        py-3
                        rounded-xl
                        text-slate-700
                        hover:bg-slate-100
                        transition-all
                      "
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{menu.label}</span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isOpened ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpened && (
                      <div className="ml-6 mt-1 border-l border-slate-200 pl-4 space-y-1">
                        {menu.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                              `
                              block
                              rounded-lg
                              px-3
                              py-2
                              text-sm
                              transition-all

                              ${
                                isActive
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                              }
                            `
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                A
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Administrator
                </p>

                <p className="text-xs text-slate-500">Production Team</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

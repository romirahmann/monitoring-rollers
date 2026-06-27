import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../shared/components/Sidebar.jsx";
import { Topbar } from "../shared/components/Topbar.jsx";

export function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-50">
      <div className="flex h-full">
        <Sidebar open={open} setOpen={setOpen} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar setOpen={setOpen} />

          <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

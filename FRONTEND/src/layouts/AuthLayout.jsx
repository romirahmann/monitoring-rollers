import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <>
      <section className="main max-w-full">
        <Outlet />
      </section>
    </>
  );
}

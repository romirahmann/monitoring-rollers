import { Outlet } from "react-router-dom";

export const LayoutAdmin = () => {
  return (
    <>
      <div className=" h-screen ">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

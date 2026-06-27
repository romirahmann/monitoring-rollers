import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import { useAuth } from "./features/Settings/Users/hooks/use.auth.js";

function App() {
  useAuth();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

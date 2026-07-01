import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import { useAuth } from "./features/Settings/Users/hooks/use.auth.js";
import { AlertMessage } from "./shared/components/alert.jsx";

function App() {
  useAuth();
  return (
    <>
      <AlertMessage />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

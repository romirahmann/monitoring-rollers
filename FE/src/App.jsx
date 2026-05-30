import { RouterProvider } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/use-auth";
import { LayoutAdmin } from "./layouts/index";
import { router } from "./app/router";
import { AlertMessage } from "./shared/components/alert";

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

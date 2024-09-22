import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LinkPage from "./pages/LinkPage";
import AuthPage from "./pages/AuthPage";
import RedirectLinkPage from "./pages/RedirectLinkPage";
import UserProvider from "./context";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <DashboardPage />,
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/:id",
        element: <RedirectLinkPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="min-h-screen">
      <UserProvider>
        <RouterProvider router={router} />;
      </UserProvider>
    </div>
  );
}

export default App;

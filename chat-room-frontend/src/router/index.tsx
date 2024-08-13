import { Link, Outlet, createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/Login/index.tsx";
import { Register } from "@/pages/Register";
import { UpdatePassword } from "@/pages/UpdatePassword";
import { Index } from "@/pages/Index";
import ErrorPage from "@/pages/errorPage";
import { UpdateInfo } from "@/pages/UpdateInfo";

const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];

const router = createBrowserRouter(routes);

export default router;

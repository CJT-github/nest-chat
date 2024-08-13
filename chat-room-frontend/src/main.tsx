import ReactDOM from "react-dom/client";
import router from "./router/index";
import { RouterProvider } from "react-router-dom";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

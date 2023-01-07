import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { AuthProvider } from "./contexts/Auth";
import withAuthenticatedScreen from "./hoc/withAuthenticatedScreen";
import LogIn from "./pages/LogIn/LogIn";
import Main from "./pages/Main/Main";
import ProductList from "./pages/ProductList/ProductList";

const WrappedMain = withAuthenticatedScreen(Main);
const WrappedProductList = withAuthenticatedScreen(ProductList);

const router = createBrowserRouter([
  {
    path: "",
    element: <WrappedMain />,
    children: [
      {
        path: "product-list",
        element: <WrappedProductList />,
      },
    ],
  },
  {
    path: "login",
    element: <LogIn />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

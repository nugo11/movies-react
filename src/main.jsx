import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Header from "./componenets/Header.jsx";
import Footer from "./componenets/Footer.jsx";
import Detail from "./componenets/Detail.jsx";
import Mov from "./componenets/Mov.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
  },
  {
    path: "/:detailLink",
    element: <Detail />
  },
  {
    path: "/movies",
    element: <Mov />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
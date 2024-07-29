import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Header from "./componenets/Header.jsx";
import Footer from "./componenets/Footer.jsx";
import Detail from "./componenets/Detail.jsx";
import Mov from "./componenets/Mov.jsx";
import Search from "./componenets/search.jsx";
import TvComp from "./componenets/TvComp";
import { MoviesProvider } from "./componenets/MoviesContext.jsx";
import Privacy from "./componenets/privacy.jsx";
import Collections from "./componenets/collect/Collections.jsx";
import Login from "./componenets/login/Login.jsx";
import { AuthProvider } from "./componenets/login/authcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <MoviesProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/detail/:detailLink" element={<Detail />} />
          <Route path="/movies" element={<Mov />} />
          <Route path="/serial" element={<Mov />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tv" element={<TvComp />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </MoviesProvider>
    </AuthProvider>
  </Router>
);

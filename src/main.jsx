import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Header from "./componenets/Header.jsx";
import Footer from "./componenets/Footer.jsx";
import Detail from "./componenets/Detail.jsx";
import Mov from "./componenets/Mov.jsx";
import Ser from "./componenets/Ser.jsx";
import Search from "./componenets/search.jsx";
import { MoviesProvider } from "./componenets/MoviesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <MoviesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:detailLink" element={<Detail />} />
        <Route path="/movies" element={<Mov />} />
        <Route path="/serial" element={<Ser />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </MoviesProvider>
  </Router>
);

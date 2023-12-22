import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import "./App.css";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/dopamin" element={<Home />} />
        <Route path="/dopamin/game/:name/:id" element={<Game />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

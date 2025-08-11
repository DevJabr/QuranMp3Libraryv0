import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, Link } from "react-router";
import Recite from "./Pages/RecitePage/Recite";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="Recite" element={<Recite />} />
      </Routes>{" "}
      <Footer />
    </div>
  );
};

export default App;

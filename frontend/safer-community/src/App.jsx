import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import CrimeHotspots from "./pages/CrimeHotspots";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crimehotspots" element={<CrimeHotspots />} />
      </Routes>
    </Router>
  );
}

export default App;

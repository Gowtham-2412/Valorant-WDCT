import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Prizes } from "./pages/Prizes/Prizes";
import { FAQ } from "./pages/FAQ/FAQ";
import { Contact } from "./pages/Contact/Contact";

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/prizes" element={<Prizes />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;

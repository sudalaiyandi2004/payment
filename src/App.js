import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/payment">Home</Link></li>
            <li><Link to="/payment/about">About</Link></li>
            <li><Link to="/payment/contact">Contact</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/payment" element={<Home />} />
          <Route path="/payment/about" element={<About />} />
          <Route path="/payment/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

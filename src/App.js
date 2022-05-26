import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { CartContext } from "./contexts/CartContext";
import "./App.css";

const App = () => {
  const [cartNum, setCartNum] = useState(0);
  console.log(cartNum);
  return (
    <div className="App">
      <HashRouter>
        <CartContext.Provider value={{ cartNum, setCartNum }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Landing />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </CartContext.Provider>
      </HashRouter>
    </div>
  );
};

export default App;

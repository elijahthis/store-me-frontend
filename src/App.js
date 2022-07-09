import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Shoes, ViewProduct, Login, Signup, Cart } from "./pages";
import { CartContext } from "./contexts/CartContext";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [cartNum, setCartNum] = useState(0);
    console.log(cartNum);
    return (
        <div className="App">
            <BrowserRouter>
                <CartContext.Provider value={{ cartNum, setCartNum }}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/shoes" element={<Shoes />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route
                            path="/view-product/:id"
                            element={<ViewProduct />}
                        />
                    </Routes>
                </CartContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;

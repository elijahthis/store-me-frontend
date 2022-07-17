import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppPage from "./pages/AppPage";
import {
    Landing,
    Shoes,
    ViewProduct,
    Login,
    Signup,
    Cart,
    Checkout,
} from "./pages";
import { CartContext } from "./contexts/CartContext";
import "./App.css";

const App = () => {
    const [cartNum, setCartNum] = useState(0);
    console.log(cartNum);
    return (
        <div className="App">
            <BrowserRouter>
                <CartContext.Provider value={{ cartNum, setCartNum }}>
                    <Routes>
                        <Route path="/" element={<AppPage />}>
                            <Route index element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/shoes" element={<Shoes />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route
                                path="/view-product/:id"
                                element={<ViewProduct />}
                            />
                        </Route>
                    </Routes>
                </CartContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;

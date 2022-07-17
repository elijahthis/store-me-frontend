import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../zustand/store";
import shallow from "zustand/shallow";
import "../css/main.css";
import "../css/Navbar.css";
import { LogoIcon } from "./svgs";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { getTotalQuantity, getTotalPrice } from "../utils/helpers";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Navbar = () => {
    //zustand global state
    const { cart, updateCart } = useGeneralStore(
        (state) => ({
            cart: state.cart,
            updateCart: state.updateCart,
        }),
        shallow
    );

    const { cartNum } = useContext(CartContext);
    const [popOpen, setPopOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <style>
                {`
                    .popover {
                        min-width: 400px;
                    }
                
                    .popover-header {
                        background-color: transparent;
                        display:flex;
                        flex-direction: row; 
                        align-items: center;
                        gap: 1rem;
                        justify-content: space-between;
                    }

                    .popover-body >div {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        gap: 1rem; 

                    }
                    .popover-body p {
                        margin-bottom: 0;
                    }
                    .popover img {
                        width: 50px;
                    }
                    .pop-price {
                        color: rgb(255, 54, 10);
                    }
                    .cartItem:hover {
                        // background-color: rgba(0,0,0,0.2);
                        cursor: pointer;
                    }
                `}
            </style>
            <header>
                <Link to="/">
                    <LogoIcon />
                </Link>
                <div>
                    <form className="search-form">
                        <span>
                            <FiSearch size={22} />
                        </span>
                        <input type="search" placeholder="Search Shoes" />
                    </form>
                    <div className="icons">
                        <OverlayTrigger
                            trigger="click"
                            placement="bottom"
                            overlay={
                                <Popover
                                    id={`popover-positioned-bottom`}
                                    style={{ zIndex: 100 }}
                                >
                                    <Popover.Header as="div">
                                        <p
                                            className="mb-0"
                                            style={{ fontWeight: 700 }}
                                        >
                                            Your Cart
                                        </p>
                                        <p className="mb-0">
                                            Total:{" "}
                                            <span
                                                style={{
                                                    color: "rgb(255, 54, 10)",
                                                }}
                                            >
                                                ${getTotalPrice(cart) || 0}
                                            </span>
                                        </p>
                                    </Popover.Header>
                                    <Popover.Body>
                                        {cart?.map((item) => (
                                            <div
                                                className="pb-2 mb-2 border-bottom cursor-pointer cartItem"
                                                onClick={() => {
                                                    navigate(
                                                        `/view-product/${item?.product?.id}`
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={item?.product?.image}
                                                    alt=""
                                                />
                                                <div>
                                                    <strong>
                                                        <p>
                                                            {
                                                                item?.product
                                                                    ?.name
                                                            }{" "}
                                                            (x{item?.qty})
                                                        </p>
                                                    </strong>
                                                    <p>
                                                        {
                                                            item?.product
                                                                ?.shortDesc
                                                        }
                                                    </p>
                                                    <p className="pop-price">
                                                        ${item?.product?.price}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <div
                                className="cart-wrapper"
                                onClick={() => navigate("/cart")}
                            >
                                <FaShoppingCart size={22} />
                                <span>{getTotalQuantity(cart) || 0}</span>
                            </div>
                        </OverlayTrigger>
                        <BsSun size={20} />
                        <div>
                            <FiMenu
                                size={22}
                                onClick={() => {
                                    setPopOpen(!popOpen);
                                }}
                            />
                            <ul
                                className="poptions"
                                style={{
                                    display: `${popOpen ? "block" : "none"}`,
                                }}
                            >
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>

                                <div></div>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;

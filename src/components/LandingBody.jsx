import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { BiDownArrowAlt } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import "../css/main.css";
import "../css/Landing.css";
import Button from "./Button";

const LandingBody = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [focus, setFocus] = useState(0);
    const testData = [
        {
            name: "Nike Air MAX 97",
            description:
                "Lacus eget risus ornare enim, maecenas aliquam tortor vestibulum. Pulvinar tincidunt a non a faucibus placerat arcu pharetra eget.",
            price: 90,
            image: "/images/bg-1.png",
        },
        {
            name: "Addidas Ultra Bost 6.0",
            description:
                "Lacus eget risus ornare enim, maecenas aliquam tortor vestibulum. Pulvinar tincidunt a non a faucibus placerat arcu pharetra eget.",
            price: "100",
            image: "/images/bg-2.png",
        },
        {
            name: "Nike Dunk Low Viotech",
            description:
                "Lacus eget risus ornare enim, maecenas aliquam tortor vestibulum. Pulvinar tincidunt a non a faucibus placerat arcu pharetra eget.",
            price: "120",
            image: "/images/bg-4.png",
        },
    ];
    const { cartNum, setCartNum } = useContext(CartContext);

    useEffect(() => {
        // const fetchData = async () => {
        //   const response = await fetch("http://localhost:8000/api/products");
        //   const data = await response.json();
        //   setTestData(data);
        //   setIsLoading(false);
        // };
        // fetchData();
        setIsLoading(false);
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <main>
            <section className="txt-side">
                <div>
                    <div>
                        <Slider
                            focus={focus}
                            handleFocus={(ind, e) => {
                                setFocus(ind - 1);
                            }}
                        />
                        <div className="socials">
                            <FiTwitter />
                            <BsInstagram />
                            <FiFacebook />
                        </div>
                    </div>
                    <div>
                        <h1>{testData[focus].name}</h1>
                        <p className="desc">{testData[focus].description}</p>
                        <div className="cart-price">
                            <Button
                                onClick={() => {
                                    setCartNum(cartNum + 1);
                                }}
                            >
                                Add to Cart
                            </Button>
                            <p className="price">
                                <span>$</span>
                                <span>{`${testData[focus].price
                                    .toString()
                                    .slice(0, -3)}`}</span>
                                <span>{`${testData[focus].price
                                    .toString()
                                    .slice(-3)}`}</span>
                            </p>
                        </div>
                        <div
                            className="sm-arrow"
                            onClick={() => navigate("/shoes")}
                        >
                            <p>See more</p>
                            <BiDownArrowAlt />
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="img-side"
                style={{ backgroundImage: `url(${testData[focus].image})` }}
            ></section>
        </main>
    );
};

export default LandingBody;

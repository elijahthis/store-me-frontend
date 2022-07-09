import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../zustand/store";
import shallow from "zustand/shallow";
import { sizeList } from "../../constants";
import Button from "../Button";
import styles from "./Product.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

const ViewProductBody = () => {
    const { id } = useParams(); // get product id
    const navigate = useNavigate();

    // zustand global states
    const allProducts = useGeneralStore((state) => state.allProducts);
    const { wishList, updateWishList } = useGeneralStore(
        (state) => ({
            wishList: state.wishList,
            updateWishList: state.updateWishList,
        }),
        shallow
    );
    const { cart, updateCart } = useGeneralStore(
        (state) => ({
            cart: state.cart,
            updateCart: state.updateCart,
        }),
        shallow
    );

    // react component states
    const [currentProduct, setCurrentProduct] = useState({});
    const [shoeSize, setShoeSize] = useState(5);
    const [isSaved, setIsSaved] = useState(false);
    const [isCarted, setIsCarted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const currentObj = allProducts.find((item) => item.id === id);
        setCurrentProduct(currentObj);
        console.log(sizeList);
        const cartIndex = cart.findIndex(
            (item) => item?.product?.id === currentObj.id
        );

        if (wishList.includes(currentObj.id)) setIsSaved(true);
        if (cartIndex !== -1) {
            setIsCarted(true);
            setQuantity(cart[cartIndex].qty);
        }
    }, []);

    useEffect(() => {
        console.log(cart);
    }, [quantity, cart]);

    useEffect(() => {
        const newList = [...cart];
        const currentIndex = cart.findIndex((item) => item?.product?.id);
        if (cart.length > 0) {
            if (quantity === 0) {
                const rm = newList.splice(currentIndex, currentIndex + 1);
                updateCart(newList);
                setIsCarted(false);
            } else {
                newList[currentIndex].qty = quantity;
                updateCart(newList);
            }
        }
        console.log(currentIndex);
    }, [quantity]);

    const controlWish = () => {
        setIsSaved(!isSaved);
        if (isSaved) {
            const newList = [...wishList];
            const wishIndex = newList.findIndex((item) => item === id);
            const rm = newList.splice(wishIndex, wishIndex + 1);
            updateWishList(newList);
        } else {
            const newList = [...wishList];
            newList.push(currentProduct.id);
            updateWishList(newList);
        }
    };

    const controlCart = () => {
        setIsCarted(!isCarted);
        if (isCarted) {
            // const newList = [...cart];
            // const cartIndex = newList.findIndex(
            //     (item) => item?.product?.id === id
            // );
            // const rm = newList.splice(cartIndex, cartIndex + 1);
            // updateCart(newList);
        } else {
            setQuantity(1);
            const newList = [...cart];
            newList.push({
                product: currentProduct,
                qty: quantity,
                size: shoeSize,
            });
            updateCart(newList);
        }
    };

    return (
        <div className="main-body">
            <div className={styles.ProductBody}>
                <img src={currentProduct.image} alt="" />
                <div>
                    <div>
                        <h3>{currentProduct.name}</h3>
                        <p className={styles.bold}>
                            {currentProduct.shortDesc}
                        </p>
                        <p className={styles.price}>${currentProduct.price}</p>
                    </div>
                    <div>
                        <p className={styles.bold}>Select size</p>
                        <div className={styles.sizes}>
                            {sizeList?.map((size) => (
                                <div
                                    key={`size-${size}`}
                                    style={{
                                        borderColor:
                                            size === shoeSize
                                                ? "#ff360a"
                                                : "rgba(0,0,0,0.2)",
                                    }}
                                    onClick={() => {
                                        setShoeSize(size);
                                    }}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        {isCarted ? (
                            <div
                                // onClick={() => controlCart()}
                                className={styles.controlQty}
                            >
                                <Button
                                    style={{ padding: "0.5rem 1rem" }}
                                    disabled={quantity <= 0}
                                    onClick={() => {
                                        if (quantity > 0)
                                            setQuantity(quantity - 1);
                                    }}
                                >
                                    -
                                </Button>
                                {quantity}
                                <Button
                                    style={{ padding: "0.5rem 1rem" }}
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={() => controlCart()}>
                                Add to Cart
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            icon={
                                isSaved ? <BsSuitHeartFill /> : <BsSuitHeart />
                            }
                            onClick={() => {
                                controlWish();
                            }}
                        >
                            Add to WishList
                        </Button>
                    </div>
                    <div className={styles.shipping}>
                        <p
                            className={styles.bold}
                            onClick={() => {
                                navigate("../cart");
                            }}
                        >
                            Shipping *
                        </p>
                        <p>To get accurate shipping information</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductBody;

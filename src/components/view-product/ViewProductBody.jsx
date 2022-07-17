import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../zustand/store";
import shallow from "zustand/shallow";
import { sizeList } from "../../constants";
import Button from "../Button";
import styles from "./Product.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import useCart from "../../hooks/useCart";
import useWishList from "../../hooks/useWishList";

const ViewProductBody = () => {
    const { id } = useParams(); // get product id
    const navigate = useNavigate();

    const [isSaved, setIsSaved, controlWish] = useWishList(id);

    const [
        shoeSize,
        setShoeSize,
        isCarted,
        setIsCarted,
        quantity,
        setQuantity,
        controlCart,
    ] = useCart(id);

    // zustand global states
    const allProducts = useGeneralStore((state) => state.allProducts);

    // react component states
    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(() => {
        const currentObj = allProducts.find((item) => item.id === id);
        setCurrentProduct(currentObj);
    }, [allProducts, id]);

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

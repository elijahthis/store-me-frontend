import { useState, useEffect } from "react";
import { useGeneralStore } from "../zustand/store";
import shallow from "zustand/shallow";

const useCart = (id) => {
    // zustand global states
    const allProducts = useGeneralStore((state) => state.allProducts);

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
    const [isCarted, setIsCarted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const currentObj = allProducts.find((item) => item.id === id);
        setCurrentProduct(currentObj);
        const cartIndex = cart.findIndex((item) => item?.product?.id === id);

        if (cartIndex !== -1) {
            setIsCarted(true);
            setQuantity(cart[cartIndex].qty);
        }
    }, [allProducts, id]);

    useEffect(() => {
        const newList = [...cart];
        const currentIndex = cart.findIndex((item) => item?.product?.id === id);
        if (cart.length > 0 && currentIndex !== -1) {
            if (quantity === 0) {
                newList.splice(currentIndex, currentIndex + 1);
                updateCart(newList);
                setIsCarted(false);
            } else {
                newList[currentIndex].qty = quantity;
                updateCart(newList);
            }
        }
        console.log(currentIndex);
    }, [quantity, id, updateCart]);

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

    return [
        shoeSize,
        setShoeSize,
        isCarted,
        setIsCarted,
        quantity,
        setQuantity,
        controlCart,
    ];
};

export default useCart;

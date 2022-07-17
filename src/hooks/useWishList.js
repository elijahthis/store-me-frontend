import { useState, useEffect } from "react";
import { useGeneralStore } from "../zustand/store";
import shallow from "zustand/shallow";

const useWishList = (id) => {
    // zustand global states
    const allProducts = useGeneralStore((state) => state.allProducts);
    const { wishList, updateWishList } = useGeneralStore(
        (state) => ({
            wishList: state.wishList,
            updateWishList: state.updateWishList,
        }),
        shallow
    );

    // react component states
    const [currentProduct, setCurrentProduct] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    // console.log(wishList);

    useEffect(() => {
        const currentObj = allProducts.find((item) => item.id === id);
        setCurrentProduct(currentObj);
        console.log("subbb");
        if (wishList.includes(currentObj.id)) setIsSaved(true);
    }, [id, allProducts, wishList]);

    const controlWish = () => {
        setIsSaved(!isSaved);
        if (isSaved) {
            const newList = [...wishList];
            const wishIndex = newList.findIndex((item) => item === id);
            newList.splice(wishIndex, wishIndex + 1);
            updateWishList(newList);
        } else {
            const newList = [...wishList];
            newList.push(currentProduct.id);
            updateWishList(newList);
        }
    };

    return [isSaved, setIsSaved, controlWish];
};

export default useWishList;

import create from "zustand";

const useStore = create((set) => ({
    allProducts: Array(20)
        .fill("shoe")
        .map((item, ind) => ({
            id: `shoe${ind}`,
            name: "Nike Zion 2",
            desc: "",
            shortDesc: "Men's running shoes",
            image: "/images/Nike-Zion-2.png",
            price: 120,
            brand: "Nike",
        })),
    updateAllProducts: (values) =>
        set((state) => ({ allProducts: { ...state.allProducts, ...values } })),

    wishList: [],
    updateWishList: (values) => set((state) => ({ wishList: values })),

    cart: [],
    updateCart: (values) => set((state) => ({ cart: values })),
}));

export const useGeneralStore = useStore;

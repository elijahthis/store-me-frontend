export const getTotalQuantity = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].qty;
    }
    return total;
};

export const getTotalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].product.price * cart[i].qty;
    }
    return total;
};

export const inputFunc = (ev, formDataObj, setFormDataObj) => {
    const name = ev.target.name;
    const newValue = ev.target.value;
    setFormDataObj({ ...formDataObj, [name]: newValue });
};

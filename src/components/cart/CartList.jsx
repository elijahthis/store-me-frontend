const CartList = ({ cart }) => {
    console.log(cart);

    return (
        <div>
            {cart.map((item) => (
                <div>
                    <img src={item?.product?.image} alt="" />
                    <div>
                        <p>{item?.product?.name}</p>
                        <p>{item?.product?.shortDesc}</p>
                        <p>{item?.size}</p>
                        <p>{item?.qty}</p>
                        <p>${item?.product?.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartList;

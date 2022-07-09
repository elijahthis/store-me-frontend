import { useGeneralStore } from "../../zustand/store";
import shallow from "zustand/shallow";
import CartList from "./CartList";

const CartBody = () => {
    //zustand global state
    const { cart, updateCart } = useGeneralStore(
        (state) => ({
            cart: state.cart,
            updateCart: state.updateCart,
        }),
        shallow
    );

    return (
        <div className="main-body">
            <div>
                <h3>Your Cart</h3>
                <div>
                    <div>
                        <CartList cart={cart} />
                    </div>
                    <div>
                        <p>Summary</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartBody;

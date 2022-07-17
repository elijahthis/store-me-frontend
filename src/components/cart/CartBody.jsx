import { useGeneralStore } from "../../zustand/store";
import shallow from "zustand/shallow";
import CartList from "./CartList";
import styles from "./cart.module.css";
import EmptyState from "../EmptyState";
import { getTotalPrice } from "../../utils/helpers";
import Button from "../Button";

const CartBody = () => {
    //zustand global state
    const today = new Date();
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
                {cart?.length === 0 ? (
                    <EmptyState
                        message="Your cart is empty."
                        actionButton={{
                            label: "Continue shopping",
                            href: "/shoes",
                        }}
                    />
                ) : (
                    <>
                        <div className={styles.bigCartWrapper}>
                            <div>
                                <CartList cart={cart} />
                            </div>
                            <div className={styles.summaryBlock}>
                                <p className={styles.title}>Summary</p>
                                <div>
                                    <p>SubTotal:</p>
                                    <p>${getTotalPrice(cart)}</p>
                                </div>
                                <div>
                                    <p>Estimated Shipping & Handling:</p>
                                    <p>
                                        $
                                        {Math.min(
                                            getTotalPrice(cart) * 0.02,
                                            30
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p>Estimated Tax:</p>
                                    <p>-</p>
                                </div>
                                <div className={styles.total}>
                                    <p>Total:</p>
                                    <p className={styles.price}>
                                        $
                                        {getTotalPrice(cart) +
                                            Math.min(
                                                getTotalPrice(cart) * 0.02,
                                                30
                                            )}
                                    </p>
                                </div>
                                <Button
                                    style={{
                                        width: "100%",
                                        marginTop: "1.5rem",
                                    }}
                                    href="/checkout"
                                >
                                    Continue to Checkout
                                </Button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="mb-2">Shipping:</p>
                            <p>
                                Arrives{" "}
                                {new Date(
                                    today.setDate(today.getDate() + 5)
                                ).toDateString()}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartBody;

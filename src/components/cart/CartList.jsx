import styles from "./cart.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";

const CartList = ({ cart }) => {
    console.log(cart);

    return (
        <div>
            {cart.map((item) => (
                <div className={styles.cartItem}>
                    <img src={item?.product?.image} alt="" />
                    <div className="w-100 d-flex flex-row align-items-start justify-content-between">
                        <div>
                            <p className={styles.cartItemName}>
                                {item?.product?.name}
                            </p>
                            <p>{item?.product?.shortDesc}</p>
                            <p>
                                <span>Size: </span>
                                <span>{item?.size}</span>
                            </p>
                            <p>
                                <span>QTY: </span>
                                <span>x{item?.qty}</span>
                            </p>
                            <div className={styles.actions}>
                                <MdDeleteOutline size={20} />
                                <BsSuitHeart size={16} />
                            </div>
                        </div>
                        <p className={styles.price}>
                            ${item?.product?.price * item?.qty}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartList;

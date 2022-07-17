import styles from "./checkout.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { getTotalPrice } from "../../utils/helpers";
import { useGeneralStore } from "../../zustand/store";
import shallow from "zustand/shallow";
import PaystackPop from "@paystack/inline-js";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const Payment = ({ deliveryFormData }) => {
    const navigate = useNavigate();

    const { cart, updateCart } = useGeneralStore(
        (state) => ({
            cart: state.cart,
            updateCart: state.updateCart,
        }),
        shallow
    );

    // paystack payment function
    const payWithPaystack = () => {
        const handler = PaystackPop.setup({
            key: "pk_test_caf77d421d328b0212a13ffba933e8e7fbcc6200", // Replace with your public key
            email: deliveryFormData.email,
            amount: getTotalPrice(cart) * 612 * 100,

            // label: "Optional string that replaces customer email"
            onClose: function () {
                console.log("Window closed.");
            },
            callback: function (response) {
                let message =
                    "Payment complete! Reference: " + response.reference;

                console.log(message);
                updateCart([]);
                navigate("../shoes");
            },
        });
        handler.openIframe();
    };

    // flutterwave payment function
    const config = {
        public_key: "FLWPUBK_TEST-c27b8811a4206b2313117e4dbcab2842-X",
        tx_ref: Date.now(),
        amount: getTotalPrice(cart) * 612,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: deliveryFormData.email,
            phonenumber: deliveryFormData.phone,
            name: `${deliveryFormData.firstName} ${deliveryFormData.lastName}`,
        },
        customizations: {
            title: "Payment for sneakers",
            description: "Payment for sneakers in cart",
            logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    return (
        <div>
            <p>Your order costs ${getTotalPrice(cart)}</p>
            <div className="d-flex flex-row items-center gap-3">
                <Button onClick={() => payWithPaystack()}>
                    Pay with Paystack
                </Button>
                <Button
                    onClick={() => {
                        handleFlutterPayment({
                            callback: (response) => {
                                console.log(response);
                                closePaymentModal(); // this will close the modal programmatically
                            },
                            onClose: () => {
                                updateCart([]);
                                navigate("../shoes");
                            },
                        });
                    }}
                    variant="secondary"
                >
                    Pay with Flutterwave
                </Button>
            </div>
        </div>
    );
};

export default Payment;

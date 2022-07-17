import { useState } from "react";
import { useGeneralStore } from "../../zustand/store";
import shallow from "zustand/shallow";
import styles from "./checkout.module.css";
import EmptyState from "../EmptyState";
import { getTotalPrice } from "../../utils/helpers";
import Button from "../Button";
import { Accordion } from "react-bootstrap";
import DeliveryOptions from "./DeliveryOptions";
import OrderReview from "./OrderReview";
import Payment from "./Payment";

const CheckoutBody = () => {
    const [activeKey, setActiveKey] = useState(0);
    const [deliveryFormData, setDeliveryFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        submitted: false,
    });

    const today = new Date();
    const { cart, updateCart } = useGeneralStore(
        (state) => ({
            cart: state.cart,
            updateCart: state.updateCart,
        }),
        shallow
    );

    const accordionData = [
        {
            header: "Delivery Options",
            body: (
                <DeliveryOptions
                    deliveryFormData={deliveryFormData}
                    setDeliveryFormData={setDeliveryFormData}
                    setActiveKey={setActiveKey}
                />
            ),
        },
        {
            header: "Order Review",
            body: (
                <OrderReview
                    deliveryFormData={deliveryFormData}
                    setActiveKey={setActiveKey}
                />
            ),
        },
        {
            header: "Payment",
            body: <Payment deliveryFormData={deliveryFormData} />,
        },
    ];

    return (
        <div className="main-body">
            <style>
                {`
                    .accordion-header button {
                        text-transform: uppercase;
                    }
                    .accordion-button:not(.collapsed) {
                        color: rgb(255, 54, 10);
                        background-color: rgba(255, 54, 10, 0.1);

                    }
                    .accordion-button:focus {
                        z-index: 3;
                        border-color: rgba(255, 54, 10, 0.1);
                        outline: 0;
                        box-shadow: 0 0 0 .25rem rgba(255, 54, 10, .25);
                `}
            </style>
            <div>
                <h3>Checkout</h3>
                {cart?.length === 0 ? (
                    <EmptyState
                        message="Your cart is empty."
                        actionButton={{
                            label: "Continue shopping",
                            href: "/shoes",
                        }}
                    />
                ) : (
                    <div className={styles.bigCheckoutWrapper}>
                        <Accordion activeKey={activeKey}>
                            {accordionData.map((item, ind) => (
                                <Accordion.Item eventKey={ind}>
                                    <Accordion.Header
                                        onClick={() => {
                                            if (deliveryFormData.submitted) {
                                                setActiveKey(ind);
                                            }
                                        }}
                                    >
                                        {ind + 1}. {item.header}
                                    </Accordion.Header>
                                    <Accordion.Body>{item.body}</Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutBody;

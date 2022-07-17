import { useState, useCallback } from "react";
import styles from "./checkout.module.css";
import { inputFunc } from "../../utils/helpers";

const DeliveryOptions = ({
    deliveryFormData,
    setDeliveryFormData,
    setActiveKey,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [tempData, setTempData] = useState(deliveryFormData);

    const submitFunc = (ev) => {
        ev.preventDefault();
        console.log(deliveryFormData);
        setDeliveryFormData({ ...tempData, submitted: true });
        setActiveKey(1);
    };

    const tabList = [
        {
            name: "Delivery",
            component: (
                <DeliveryForm
                    submitFunc={submitFunc}
                    deliveryFormData={deliveryFormData}
                    setDeliveryFormData={setDeliveryFormData}
                    tempData={tempData}
                    setTempData={setTempData}
                />
            ),
        },
        { name: "Pickup", component: <></> },
    ];

    return (
        <div>
            <div className={styles.tabs}>
                {tabList.map((item, ind) => (
                    <div
                        key={`delivery-tab-${ind}`}
                        onClick={() => setActiveTab(ind)}
                        style={{
                            borderColor:
                                activeTab === ind
                                    ? "rgb(255, 54, 10)"
                                    : "#1a1a1a",
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {tabList[activeTab].component}
        </div>
    );
};

const DeliveryForm = ({ submitFunc, tempData, setTempData }) => {
    const handleInput = (ev) => {
        inputFunc(ev, tempData, setTempData);
    };

    return (
        <form action="" onSubmit={submitFunc}>
            <div class={styles.formGroup}>
                <label htmlFor="">
                    First Name
                    <input
                        type="text"
                        name="firstName"
                        id=""
                        placeholder="Sadio"
                        required
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="">
                    Last Name
                    <input
                        type="text"
                        name="lastName"
                        id=""
                        placeholder="Mane"
                        required
                        onChange={handleInput}
                    />
                </label>
            </div>
            <div class={styles.formGroup}>
                <label htmlFor="">
                    Email Address
                    <input
                        type="email"
                        name="email"
                        id=""
                        placeholder="shopper@store.me"
                        required
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="">
                    Phone Number
                    <input
                        type="text"
                        name="phone"
                        id=""
                        placeholder="(+234) 700 000 000"
                        required
                        onChange={handleInput}
                    />
                </label>
            </div>
            <div class={styles.formGroup}>
                <label htmlFor="">
                    Address Line 1
                    <input
                        type="text"
                        name="address"
                        id=""
                        placeholder="16, Unity Ave."
                        required
                        onChange={handleInput}
                    />
                </label>
            </div>
            <div class={styles.formGroup}>
                <label htmlFor="">
                    City
                    <input
                        type="text"
                        name="city"
                        id=""
                        placeholder="Ikeja"
                        required
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="">
                    State
                    <input
                        type="text"
                        name="state"
                        id=""
                        placeholder="Lagos"
                        required
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="">
                    Country
                    <input
                        type="text"
                        name="country"
                        id=""
                        placeholder="Nigeria"
                        required
                        onChange={handleInput}
                    />
                </label>
            </div>
            <input type="submit" value="Save" />
        </form>
    );
};

export default DeliveryOptions;

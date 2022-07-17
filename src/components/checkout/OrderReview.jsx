import Button from "../Button";

const OrderReview = ({ deliveryFormData, setActiveKey }) => {
    return (
        <div>
            <div className="mb-4">
                <p className="mb-1">
                    {deliveryFormData.firstName} {deliveryFormData.lastName}
                </p>
                <p className="mb-1">{deliveryFormData.address}</p>
                <p className="mb-1">
                    {deliveryFormData.city} {deliveryFormData.state}
                </p>
                <p className="mb-1">{deliveryFormData.country}</p>
                <p className="mb-1">{deliveryFormData.phone}</p>
                <p className="mb-1">{deliveryFormData.email}</p>
            </div>
            <Button onClick={() => setActiveKey(2)}>Proceed</Button>
        </div>
    );
};

export default OrderReview;

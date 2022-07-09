import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ViewProductBody from "../components/view-product/ViewProductBody";

const ViewProduct = () => {
    return (
        <>
            <Navbar />
            <ViewProductBody />
        </>
    );
};

export default ViewProduct;

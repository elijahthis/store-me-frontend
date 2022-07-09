import styles from "./Shoes.module.css";
import { useNavigate } from "react-router-dom";

const ShoeCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.ShoeCard}
            onClick={() => navigate(`../view-product/${data?.id}`)}
        >
            <img src={data?.image} alt="Alt Text!" />
            <div className={styles.ShoeCard__info}>
                <p>{data?.name}</p>
                <p
                    style={{
                        color: "rgba(0, 0, 0, 0.6)",
                        marginBottom: "1rem",
                    }}
                >
                    {data?.shortDesc}
                </p>
                <p style={{ fontSize: "0.85rem", color: "ff360a" }}>
                    ${data?.price}
                </p>
            </div>
        </div>
    );
};

export default ShoeCard;

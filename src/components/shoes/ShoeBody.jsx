import ShoeCard from "./ShoeCard";
import styles from "./Shoes.module.css";
import { useGeneralStore } from "../../zustand/store";

const ShoeBody = () => {
    const allProducts = useGeneralStore((state) => state.allProducts);

    return (
        <div className="main-body">
            <div className={styles.ShoeBody}>
                <h3>Latest Releases ({allProducts?.length})</h3>
                <div className={styles.shoesFlex}>
                    {allProducts?.map((item) => (
                        <ShoeCard data={item} key={item?.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShoeBody;

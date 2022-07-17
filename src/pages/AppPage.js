import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppPage = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default AppPage;

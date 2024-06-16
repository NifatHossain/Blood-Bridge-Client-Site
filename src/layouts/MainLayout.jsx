import { Outlet } from "react-router-dom";
import Navbar from "../pages/generalPages/homeComponents/Navbar";


const MainLayout = () => {
    return (
        <div className="roboto">
            <Navbar></Navbar>
           <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;
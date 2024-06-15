import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="roboto">
           <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin]= useAdmin()
    return (
        <div className="flex">
            <div className="w-60 min-h-screen bg-orange-400">
                <ul className="menu gap-4">
                    {
                        isAdmin? <>
                        <li><NavLink to='/dashboard/adminhome'><FaHouse></FaHouse> Admin Home</NavLink></li>
                        <li><NavLink to='/dashboard/additem'><MdRestaurantMenu /> Add Item</NavLink></li>
                        <li><NavLink to='/dashboard/payment'><HiMenu /> Manage Items</NavLink></li>
                        <li><NavLink to='/dashboard/review'><FaBook></FaBook> Manage Bookings</NavLink></li>
                        <li><NavLink to='/dashboard/booking'><FaUsers></FaUsers> All users</NavLink></li>
                        </>:<>
                        <li><NavLink to='/dashboard/cart'><FaCartPlus></FaCartPlus> My Cart</NavLink></li>
                        <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>
                        <li><NavLink to='/dashboard/payment'><FaWallet></FaWallet> My Payments</NavLink></li>
                        <li><NavLink to='/dashboard/review'><FaComment></FaComment> My review</NavLink></li>
                        <li><NavLink to='/dashboard/booking'><FaHouse></FaHouse> My Bookings</NavLink></li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/menu'><MdRestaurantMenu /> Menu </NavLink></li>
                    <li><NavLink to='/order/:category'><FaBasketShopping /> Order </NavLink></li>
                    <li><NavLink to='/contact'><BiSupport /> Contact </NavLink></li>
                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
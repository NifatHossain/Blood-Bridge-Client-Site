import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";
import { FaBlogger, FaGlobe, FaHandsHelping, FaHome } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";


const Dashboard = () => {
    const [isAdmin]= useAdmin()
    const [isVolunteer]=useVolunteer()
    return (
        <div className="flex">
            <div className="w-60 min-h-screen bg-orange-400">
                <ul className="menu gap-4">
                    {
                        isAdmin? <>
                            <li><NavLink to='/dashboard/adminhome'><FaGlobe></FaGlobe> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/donars'><BiDonateBlood /> All Doners</NavLink></li>
                            <li><NavLink to='/dashboard/allrequests'><MdAddBox /> All Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/contentsmanagement'><FaBlogger /> Contents Management</NavLink></li>
                        </>:isVolunteer?<>
                            <li><NavLink to='/dashboard/volunteerhome'><FaHandsHelping /> volunteer Home</NavLink></li>
                            <li><NavLink to='/dashboard/allrequests'><MdAddBox /> All Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/contentsmanagement'><FaBlogger /> Contents Management</NavLink></li>
                        </>:<>
                            <li><NavLink to='/dashboard/donarhome'>My Dashboard</NavLink></li>
                            <li><NavLink to='/dashboard/myrequests'>My Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/createrequest'>Create Donation Request</NavLink></li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/donationrequests'><MdAddBox /> All Donation Requests</NavLink></li>
                    <li><NavLink to='/blogs'><FaBlogger /> Blogs</NavLink></li>
                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
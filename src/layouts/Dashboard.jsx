import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";
import { FaBlogger, FaGlobe, FaHandsHelping, FaHome, FaNotesMedical, FaUser, FaUsers } from "react-icons/fa";
import { MdAddBox} from "react-icons/md";


const Dashboard = () => {
    const [isAdmin]=useAdmin(); 
    const [isVolunteer]=useVolunteer()
    return (
        <div className="flex roboto">
            <div className="w-60 min-h-screen bg-rose-400">
                <ul className="menu gap-4">
                    <li><div className=" text-2xl bg-white"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div></li>
                    {
                        isAdmin? <>
                            <li><NavLink to='/dashboard/adminhome'><FaGlobe></FaGlobe> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/alldonars'><FaUsers /> All Doners</NavLink></li>
                            <li><NavLink to='/dashboard/allrequests'><MdAddBox/> All Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/contentsmanagement'><FaBlogger /> Contents Management</NavLink></li>
                        </>:isVolunteer?<>
                            <li><NavLink to='/dashboard/volunteerhome'><FaHandsHelping /> volunteer Home</NavLink></li>
                            <li><NavLink to='/dashboard/allrequests'><MdAddBox /> All Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/contentsmanagement'><FaBlogger /> Contents Management</NavLink></li>
                        </>:<>
                            <li><NavLink to='/dashboard/donarhome'><FaUser></FaUser> My Dashboard</NavLink></li>
                            <li><NavLink to='/dashboard/myrequests'><MdAddBox /> My Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/createrequest'><FaNotesMedical /> Create Donation Request</NavLink></li>
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
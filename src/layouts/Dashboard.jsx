import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";
import { FaBlogger, FaGlobe, FaHandsHelping, FaHome, FaNotesMedical, FaUser, FaUsers } from "react-icons/fa";
import { MdAddBox, MdOutlineMenu} from "react-icons/md";
import { useState } from "react";


const Dashboard = () => {
    const [isAdmin]=useAdmin(); 
    const [isVolunteer]=useVolunteer()
    const [hide, setHide]=useState(false)
    const handleToggle=()=>{
        setHide(!hide)
    }
    return (
        <div className="bg-teal-50">
            
        <div className="flex roboto">
            <div className={hide?'hidden':"w-60 min-h-screen absolute md:static z-10 md:z-0 bg-teal-400"}>
                <ul className="menu gap-4">
                    <li><button onClick={handleToggle} className="cursor-pointer p-2 w-fit bg-teal-50 px-3 py-2 rounded-md"><MdOutlineMenu className="text-2xl" /></button></li>
                    <li><div className=" text-2xl bg-white"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div></li>
                    {
                        isAdmin? <>
                            <li><NavLink to='/dashboard/profile'><FaUser></FaUser> My Profile</NavLink></li>
                            <li><NavLink to='/dashboard/adminhome'><FaGlobe></FaGlobe> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/alldonars'><FaUsers /> All Doners</NavLink></li>
                            <li><NavLink to='/dashboard/allrequests'><MdAddBox/> All Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/contentsmanagement'><FaBlogger /> Contents Management</NavLink></li>
                            <li><NavLink to='/dashboard/myrequests'><MdAddBox /> My Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/createrequest'><FaNotesMedical /> Create Donation Request</NavLink></li>
                        </>:isVolunteer?<>
                            <li><NavLink to='/dashboard/profile'><FaUser></FaUser> My Profile</NavLink></li>
                            <li><NavLink to='/dashboard/adminhome'><FaHandsHelping /> volunteer Home</NavLink></li>
                            <li><NavLink to='/dashboard/allrequests'><MdAddBox /> All Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/contentsmanagement'><FaBlogger /> Contents Management</NavLink></li>
                            <li><NavLink to='/dashboard/myrequests'><MdAddBox /> My Donation Requests</NavLink></li>
                            <li><NavLink to='/dashboard/createrequest'><FaNotesMedical /> Create Donation Request</NavLink></li>
                        </>:<>
                            <li><NavLink to='/dashboard/profile'><FaUser></FaUser> My Profile</NavLink></li>
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
                <button onClick={handleToggle} className={(!hide)?'hidden':"cursor-pointer px-3 py-2 m-3 rounded-md w-fit bg-teal-500 absolute z-10"}><MdOutlineMenu className="text-2xl" /></button>
                <div className={(!hide)?'':'-mt-9'}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
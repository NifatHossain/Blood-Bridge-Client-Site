import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const {user,logOut}=useAuth()
    const options= <>
        <li><Link to={'/'} className="font-semibold">Donation Requests</Link></li>
        <li><Link to={'/allcrafts'} className="font-semibold">Blogs</Link></li>
        {/* <li><Link to={`/myitems/${user?.email}`} className="font-semibold">My Art & Craft List</Link></li> */}
    </>
    const handleLogOut=()=>{
        logOut()
            .then(()=>{
                alert('logout successfull')
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }
    return (
        <div>
        <div className="navbar bg-base-100">
            <div className="navbar-start relative z-10">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {
                    options
                }
                </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-2xl"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {
                    options
                }
                </ul>
            </div>
            <div className="navbar-end relative z-20">
                {
                    user && <div>
                        <div id='avater' className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img alt="user Image" src={user.photoURL} />
                                </div>
                            </div>
                            {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Logout</a></li>
                            </ul> */}
                        </div>
                        <Tooltip anchorSelect="#avater" style={{ backgroundColor: "rgb(241 245 249)", color: "#222" }} clickable>
                            <p className="text-center">{user.displayName}</p>
                             <Link to={'/dashboard'}><button className="border-2 bg-slate-100 px-2 py-1 rounded-md font-semibold">Dashboard</button></Link>
                             <button onClick={handleLogOut} className="border-2 bg-slate-100 px-2 py-1 rounded-md font-semibold">Log Out</button>
                        </Tooltip>
                    </div>
                }
                {
                    !user && <div>
                         {/* <Link to={'/register'}><button className="bg-gray-400 p-2 text-white rounded-md mr-2">Register</button></Link>  */}
                         <Link to={'/login'}><button className="bg-green-400 p-2 text-white rounded-md ">Log In</button></Link> 
                    </div>
                }
                
                
                
            </div>
        </div>
    </div>
    );
};

export default Navbar;
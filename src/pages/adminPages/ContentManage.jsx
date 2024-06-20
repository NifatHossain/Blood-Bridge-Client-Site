import { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";


const ContentManage = () => {
    const[hide,setHide]=useState(false)
    const handleHide=()=>{
        setHide(!hide)
    }
    return (
        <div>
            <div className="py-5 bg-teal-50">
                <div className="flex justify-center gap-5">
                    <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Content Management</h2>
                    {
                        (hide===false)?<NavLink to={'/dashboard/contentsmanagement/addcontent'}><button onClick={handleHide} className="btn bg-teal-500 text-white"> <MdCreateNewFolder className="text-2xl" /> add content</button></NavLink>:<NavLink to={'/dashboard/contentsmanagement'}><button onClick={handleHide} className="btn bg-teal-500 text-white"> <MdCreateNewFolder className="text-2xl" /> Return</button></NavLink>
                    }
                </div>
                <div className={hide&&"hidden bg-teal-50" }>
                    <h2>All previous contents</h2>
                </div>
                
            </div>
            <div className={(!hide)&&"hidden"}>
                <Outlet></Outlet>
            </div>
        </div>
        
    );
};

export default ContentManage;
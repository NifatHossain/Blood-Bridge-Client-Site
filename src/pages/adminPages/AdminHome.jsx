import { FaUsers } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { FaSackDollar } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import useAllRequests from "../../hooks/useAllRequests";


const AdminHome = () => {
    const {user}=useAuth();
    const [requests]=useAllRequests()
    return (
        <div className="py-5 bg-teal-50 h-screen">
            <div className="flex">
                <div className="flex flex-1 justify-center items-center">
                    <h2 className="text-center text-2xl w-[60%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Welcome {user.displayName}</h2>
                </div>
                <div className="avatar mr-5 hidden md:block">
                    <div className="w-24 rounded-full">
                        <img src={user.photoURL} />
                    </div>
                </div>
            </div>
            <div className="h-[70%] flex justify-center items-center">
            <div >
                <div className="flex flex-col md:flex-row justify-center mt-7 gap-9">
                    {/* totaluser */}
                    <div className="flex justify-center">
                        <div className="flex gap-4 items-center p-5 bg-rose-300 border-2 w-fit rounded-lg">
                            <div>
                                <FaUsers className="text-5xl text-rose-600 "></FaUsers>
                            </div>
                            <div>
                                <p className="text-3xl text-white font-semibold ">Total Doners</p>
                                <p className="text-3xl text-white font-semibold ">200</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center p-5 bg-yellow-300 border-2 w-fit rounded-lg">
                        <div>
                            <FaSackDollar className="text-5xl text-yellow-600 " />
                        </div>
                        <div>
                            <p className="text-3xl text-white font-semibold ">Total Fundings</p>
                            <p className="text-3xl text-white font-semibold ">55000 tk</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-center mt-9">
                        <div className="flex gap-4 items-center p-5 bg-green-300 border-2 w-fit rounded-lg">
                            <div>
                                <MdBloodtype className="text-5xl text-green-600 " />
                            </div>
                            <div>
                                <p className="text-3xl text-white font-semibold ">Donation Requests</p>
                                <p className="text-3xl text-white font-semibold ">{requests.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

    );
};

export default AdminHome;
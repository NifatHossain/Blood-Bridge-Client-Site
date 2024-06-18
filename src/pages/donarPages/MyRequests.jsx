import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const MyRequests = () => {
    const{user}=useAuth()
    const axiosSecure=useAxiosSecure()
    useEffect(()=>{
        axiosSecure.get(`/getdonationrequests/${user.email}`)
    },[])
    return (
        <div className="py-5 bg-rose-50">
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-rose-300 rounded-md mb-4">My Requests</h2>
            </div>

        </div>
    );
};

export default MyRequests;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure=useAxiosSecure()
    const {user}= useAuth()
    const {data: isAdmin}=useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async()=>{
            const result=await axiosSecure.get(`/getadmin/${user.email}`)
            return result.data?.admin;
        }
    })


    return [isAdmin]
};

export default useAdmin;
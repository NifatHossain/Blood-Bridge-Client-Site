import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useIsBlocked = () => {
    const axiosSecure=useAxiosSecure()
    const {user}= useAuth()
    const {data: isBlocked}=useQuery({
        queryKey: [user?.email, 'isBlocked'],
        queryFn: async()=>{
            const result=await axiosSecure.get(`/getisblocked/${user.email}`)
            return result.data?.isBlocked;
        }
    })


    return [isBlocked]
};

export default useIsBlocked;
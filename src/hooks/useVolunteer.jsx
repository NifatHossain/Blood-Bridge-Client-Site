import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useVolunteer = () => {
    const axiosSecure=useAxiosSecure()
    const {user}= useAuth()
    const {data: isVolunteer}=useQuery({
        queryKey: [user?.email, 'isVolunteer'],
        queryFn: async()=>{
            const result=await axiosSecure.get(`/getvolunteer/${user.email}`)
            return result.data?.volunteer;
        }
    })


    return [isVolunteer]
};

export default useVolunteer;
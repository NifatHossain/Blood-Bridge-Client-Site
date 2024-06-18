import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRequests = () => {
    const{user}=useAuth()
    const axiosSecure= useAxiosSecure()
    const { refetch,data: requests=[] } = useQuery({
        queryKey: ['requests'],
        queryFn:async () => {
            const res = await axiosSecure.get(`/getdonationrequests/${user.email}`)
            return res.data;
          },

    })
    return [requests,refetch]
};

export default useRequests;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useFilteredRequests = (filter) => {
    const{user}=useAuth()
    const axiosSecure= useAxiosSecure()
    const { refetch,data: requests=[] } = useQuery({
        queryKey: ['requests'],
        queryFn:async () => {
            const res = await axiosSecure.get(`/getfilteredrequests?email=${user.email}&filter=${filter}`)
            return res.data;
          },

    })
    return [requests,refetch]
};

export default useFilteredRequests;
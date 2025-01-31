import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllRequests = () => {
    const axiosSecure=useAxiosSecure()
    const { refetch,data: requests=[] } = useQuery({
        queryKey: ['requests'],
        queryFn:async () => {
            const res = await axiosSecure.get(`/getalldonationrequests`)
            return res.data;
          },

    })
    return [requests,refetch]
};

export default useAllRequests;
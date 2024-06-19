import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllRequests = () => {
    const axiosPublic= useAxiosPublic()
    const { refetch,data: requests=[] } = useQuery({
        queryKey: ['requests'],
        queryFn:async () => {
            const res = await axiosPublic.get(`/getalldonationrequests`)
            return res.data;
          },

    })
    return [requests,refetch]
};

export default useAllRequests;
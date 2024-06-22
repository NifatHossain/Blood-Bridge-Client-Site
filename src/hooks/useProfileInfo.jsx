import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useProfileInfo = () => {
    const {user}=useAuth()
    const axiosSecure= useAxiosSecure()
    const { refetch,data: profileInfo=[] } = useQuery({
        queryKey: ['profileInfo'],
        queryFn:async () => {
            const res = await axiosSecure.get(`/getprofileinfo/${user.email}`)
            return res.data;
            },

    })
    return [profileInfo,refetch]
};

export default useProfileInfo;
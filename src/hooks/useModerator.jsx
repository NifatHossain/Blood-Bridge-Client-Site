
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useModerator = () => {
    const axiosSecure=useAxiosSecure()
    const {user}= useAuth()
    const {data: isModerator}=useQuery({
        queryKey: [user?.email, 'isModerator'],
        queryFn: async()=>{
            const result=await axiosSecure.get(`/getmoderator/${user.email}`)
            return result.data?.admin;
        }
    })


    return [isModerator]
};

export default useModerator;
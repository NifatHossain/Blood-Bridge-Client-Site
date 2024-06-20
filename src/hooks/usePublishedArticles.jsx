import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePublishedArticles = () => {
    const axiosPublic=useAxiosPublic()
    const { refetch,data: articles=[] } = useQuery({
        queryKey: ['articles'],
        queryFn:async () => {
            const res = await axiosPublic.get(`/getpublishedarticles`)
            return res.data;
          },

    })
    return [articles,refetch]
};

export default usePublishedArticles;
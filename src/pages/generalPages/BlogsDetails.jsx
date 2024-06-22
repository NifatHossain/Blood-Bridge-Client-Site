import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const BlogsDetails = () => {
    const axiosPublic=useAxiosPublic()
    const location= useLocation()
    const navigate= useNavigate()
    const [article,setarticle]=useState({})
    const queryParameters = new URLSearchParams(window.location.search)
    const requestId = queryParameters.get("id")
    useEffect(()=>{
        axiosPublic.get(`getblogdetails/${requestId}`)
        .then(Result=>setarticle(Result.data))
        console.log(article)
    },[])
    const handleBack=()=>{
        navigate(location?.state? location.state:'/blogs')
    }
    return (
        <div className="py-5 bg-teal-50 min-h-screen">
            <Helmet>
                <title>Blood Bridge | Blog Details</title>
            </Helmet>
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Blog Details</h2>
            </div>
            <div className="pb-20">
                <div className="flex justify-center">
                    <img className="w-1/2" src={article.image} alt="" />
                </div>
                <div className="p-3 bg-white">
                    <div className="flex justify-around">
                        <p className="text-slate-400">Author: {article.authorName}</p>
                        <p className="text-slate-400">Status: {article.status}</p>
                    </div>
                    <h2 className="text-lg font-semibold">{article.title}</h2>
                    <p>{(article.article)}</p>
                </div>
                <div className="flex justify-center">
                    <button onClick={handleBack} className="btn">Back</button>
                </div>
            </div>
            
        </div>
    );
};

export default BlogsDetails;
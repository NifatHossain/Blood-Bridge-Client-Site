import { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAllArticles from "../../hooks/useAllArticles";
import Lottie from "lottie-react";
import noDataAnimation from "../../../public/noDataFound.json"
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContentManage = () => {
    const[hide,setHide]=useState(false)
    const [articles,refetch]=useAllArticles()
    const axiosSecure= useAxiosSecure();
    const [isAdmin]=useAdmin()
    const handleHide=()=>{
        setHide(!hide)
    }
    const handlePublish=(id,status)=>{
        axiosSecure.patch(`modifyarticlestatus?id=${id}&status=${status}`)
        .then(Result=>{
            if(Result.data.modifiedCount>0){
                refetch()
                Swal.fire({
                title: "Success",
                text: "Article status changed",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
                });
                // navigate('/dashboard/myrequests')
                
            }
        })
    }
    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            if (result.isConfirmed) {
            
                axiosSecure.delete(`/deletearticle/${id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        refetch();
                        Swal.fire({
                        title: "Deleted!",
                        text: "Article has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                        });
                    }
                })
            }
        });
    }
    return (
        
        <div className="bg-teal-50">
            <div className="py-5 mt-10 ">
                <div className="flex flex-col md:flex-row justify-center gap-5">
                    <div className="flex justify-center w-[70%] mx-auto">
                        <h2 className="text-center text-2xl  px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Content Management</h2>
                    </div>
                    <div className="flex justify-center mb-5">
                        {
                            (hide===false)?<NavLink to={'/dashboard/contentsmanagement/addcontent'}><button onClick={handleHide} className="btn bg-teal-500 text-white"> <MdCreateNewFolder className="text-2xl" /> add content</button></NavLink>:<NavLink to={'/dashboard/contentsmanagement'}><button onClick={handleHide} className="btn bg-teal-500 text-white"> <MdCreateNewFolder className="text-2xl" /> Return</button></NavLink>
                        }
                    </div>
                </div>
                <div className={hide&&"hidden bg-teal-50" }>
                    {
                        (!(articles.length>0))?<>
                            <div className="flex justify-center items-center">
                                <Lottie className=" w-1/2 " animationData={noDataAnimation} />
                            </div>
                        </>:<div  className="mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
                            {
                                articles.map((article)=><div key={article._id}>
                                    <div className="border-2 rounded-lg">
                                        <div>
                                            <img className="w-full" src={article.image} alt="" />
                                        </div>
                                        <div className="p-3 bg-white">
                                            <div className="flex justify-around">
                                                <p className="text-slate-400">Author: {article.authorName}</p>
                                                <p className="text-slate-400">Status: {article.status}</p>
                                            </div>
                                            <h2 className="text-lg font-semibold">{article.title}</h2>
                                            <span>{(article.article).slice(0,100)}</span>
                                            <Link state={location.pathname} to={`/articleDetails?id=${article._id}`}><span className="btn btn-xs">Read More</span></Link>
                                            
                                            <div className="flex gap-4 mt-3">
                                                {
                                                    ((article.status==='draft') && isAdmin)?<button onClick={()=>handlePublish(article._id,'published')} className="btn bg-teal-400 text-white">Publish</button>:((article.status==='published') && isAdmin) &&<button onClick={()=>handlePublish(article._id,'draft')} className="btn bg-teal-400 text-white">Unpublish</button>
                                                }
                                                {
                                                    isAdmin && <button onClick={()=>handleDelete(article._id)} className="btn bg-rose-400 text-white">Delete</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    }
                </div>
                
            </div>
            <div className={(!hide)&&"hidden"}>
                <Outlet></Outlet>
            </div>
        </div>
        
    );
};

export default ContentManage;
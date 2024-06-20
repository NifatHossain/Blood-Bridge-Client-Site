import Lottie from "lottie-react";
import usePublishedArticles from "../../hooks/usePublishedArticles";
import noDataAnimation from "../../../public/noDataFound.json"
import { Link } from "react-router-dom";

const Blogs = () => {
    const[articles]=usePublishedArticles()
    return (
        <div className="py-5 bg-teal-50 h-screen">
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Blogs</h2>
            </div>
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
                                    {/* <hr className="my-3" />
                                    <div className="flex gap-4">
                                        {
                                            ((article.status==='draft') && isAdmin)?<button onClick={()=>handlePublish(article._id,'published')} className="btn bg-teal-400 text-white">Publish</button>:((article.status==='published') && isAdmin) &&<button onClick={()=>handlePublish(article._id,'draft')} className="btn bg-teal-400 text-white">Unpublish</button>
                                        }
                                        {
                                            isAdmin && <button onClick={()=>handleDelete(article._id)} className="btn bg-rose-400 text-white">Delete</button>
                                        }
                                    </div> */}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }
        </div>
    );
};

export default Blogs;
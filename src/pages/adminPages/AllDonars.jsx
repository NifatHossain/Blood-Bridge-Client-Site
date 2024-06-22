import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllDonars from "../../hooks/useAllDonars";
import Lottie from "lottie-react";
import noDataAnimation from "../../../public/noDataFound.json"
import Swal from "sweetalert2";


const AllDonars = () => {
    const axiosSecure=useAxiosSecure()
    const { register,handleSubmit, formState: { errors } } = useForm();
    const [users,refetch]=useAllDonars()
    const handleAction=(id,status)=>{
        axiosSecure.patch(`modifyuserstatus?id=${id}&status=${status}`)
        .then(Result=>{
            if(Result.data.modifiedCount>0){
                refetch()
                Swal.fire({
                title: "Success",
                text: "user status changed",
                icon: "success"
                });
                // navigate('/dashboard/myrequests')
                
            }
        })
    }
    const handlePromote=(id,role)=>{
        axiosSecure.patch(`modifyuserrole?id=${id}&role=${role}`)
        .then(Result=>{
            if(Result.data.modifiedCount>0){
                refetch()
                Swal.fire({
                title: "Success",
                text: "User has been promoted",
                icon: "success"
                });
                // navigate('/dashboard/myrequests')
                
            }
        })
    }
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="py-5 bg-teal-50 min-h-screen">
            <div className="flex justify-center mt-8 md:mt-6">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">All Donars</h2>
            </div>
            <div>
                <form className="flex gap-3 mt-7" onSubmit={handleSubmit(onSubmit)}>
                    <select className="border-2 rounded-sm p-2 ml-3" {...register("filterCondt", { required: true })}>
                        <option value="">Filter user</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                    {errors.filterCondt && <p className="text-red-500">Secect one to filter</p>}
                    <input type="submit"className="btn btn-sm" />
                </form>


            </div>
            {
                (!(users.length>0))?<>
                    <div className="flex justify-center items-center">
                        <Lottie className=" w-1/2 " animationData={noDataAnimation} />
                    </div>
                </>:<>
                <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-base">
                    <tr>
                        <th>serial</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Promote to</th>
                    </tr>
                    </thead>
                    {
                        users.map((user,idx)=><tbody key={idx}>
                        <tr>
                            <th>{idx+1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.image} alt="userImage" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{user.name}</div>
                                    {/* <div className="text-sm opacity-50">United States</div> */}
                                    </div>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            {
                                (user.status==='active' && !(user.role==='admin')) ?<td><button onClick={()=>handleAction(user._id,'block')}  className="btn bg-rose-500 text-white">Block</button></td>:  (user.status==='block' && !(user.role==='admin'))? <td><button onClick={()=>handleAction(user._id,'active')} className="btn bg-teal-500 text-white">Active</button></td>:<td>-----</td>
                            }
                            {
                                (user.role==='donar')?<td>
                                        <div className="flex flex-col"><button onClick={()=>handlePromote(user._id,'admin')}  className="btn bg-green-500 text-white">Admin</button>
                                            <button onClick={()=>handlePromote(user._id,'volunteer')} className="btn bg-teal-500 text-white">Volunteer</button>
                                        </div>
                                    </td>:(user.role==='volunteer')?<td className="text-green-500">
                                                                        <button onClick={()=>handlePromote(user._id,'admin')}  className="btn bg-green-500 text-white">Admin</button></td>:<td>------</td>
                            }
                            
                            
                        </tr>
                        </tbody>)
                        }
                </table>
                </div>
                </>

            }
            

        </div>
    );
};


export default AllDonars;
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import noDataAnimation from "../../../public/noDataFound.json"
import useAllRequests from "../../hooks/useAllRequests";
import useAdmin from "../../hooks/useAdmin";
import useVolunteer from "../../hooks/useVolunteer";
import { Helmet } from "react-helmet";

const AllRequests = () => {
    const axiosSecure=useAxiosSecure()
    const[isAdmin]=useAdmin()
    const[isVolunteer]=useVolunteer()
    const { register,handleSubmit, formState: { errors } } = useForm();
    
    const [requests,refetch]=useAllRequests()
    // setReqData(requests)
    const navigate= useNavigate()
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
            
                axiosSecure.delete(`/deleterequest/${id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        refetch();
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your request has been deleted.",
                        icon: "success"
                        });
                    }
                })
            }
        });
    }
    const handleSelectDonar=(id,status)=>{
        axiosSecure.patch(`modifyrequeststatus?id=${id}&status=${status}`)
        .then(Result=>{
            if(Result.data.modifiedCount>0){
                refetch()
                Swal.fire({
                title: "Request Accepted",
                text: "Now you should contact Donar",
                icon: "success"
                });
                navigate('/dashboard/myrequests')
                
            }
        })
    }
    const onSubmit = (data) => {
        console.log(data)
        // axiosSecure.get(`/getfilteredrequests?email=${user.email}&filter=${data.filterCondt}`)
        // .then(result=>setReqData(result.data))
    }

    return (
        <div className="py-5 bg-teal-50 min-h-screen">
            <Helmet>
                <title>Blood Bridge | All Requests</title>
            </Helmet>
            <div className="flex justify-center mt-8 md:mt-6">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">All Donation Requests</h2>
            </div>
            <div>
                <form className="flex gap-3 mt-7" onSubmit={handleSubmit(onSubmit)}>
                    <select className="border-2 rounded-sm p-2" {...register("filterCondt", { required: true })}>
                        <option value="">Filter</option>
                        <option value="pending">pending</option>
                        <option value="onprogress">inprogress</option>
                        <option value="onprogress">done</option>
                        <option value="onprogress">canceled</option>
                    </select>
                    {errors.filterCondt && <p className="text-red-500">Secect one to filter</p>}
                    <input type="submit"className="btn btn-sm" />
                </form>


            </div>
            {
                (!(requests.length>0))?<>
                    <div className="flex justify-center items-center">
                        <Lottie className=" w-1/2 " animationData={noDataAnimation} />
                    </div>
                </>:<>
                <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>serial</th>
                        <th>Recipient Name</th>
                        <th>Blood Group</th>
                        <th>Recipient Address</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Donar Info.</th>
                        <th>Action</th>
                        <th>Delete</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    {
                        requests.map((request,idx)=><tbody key={idx}>
                        <tr>
                            <th>{idx+1}</th>
                            <td>{request.recipientName}</td>
                            <td>{request.blood_group}</td>
                            <td>{request.upzilla}, {request.district}</td>
                            <td>{request.donationDate}</td>
                            <td>{request.donationTime}</td>
                            <td>{request.status}</td>
                            {
                                request.status==='inprogress'||request.status==='done'?<td><p>{request.donarName}</p><p>{request.donarEmail}</p></td>:<td>---</td>
                            }
                            {
                                (request.status==='inprogress')?<td><div className="flex flex-col"><button onClick={()=>handleSelectDonar(request._id,'done')}  className="btn bg-green-400 text-white">Done</button><button onClick={()=>handleSelectDonar(request._id,'cancel')} className="btn bg-teal-300 text-white">Cancel</button></div></td>:<td className="text-green-400">{request.status}</td>
                            }
                            {
                                isAdmin? <td><button onClick={()=>handleDelete(request._id)} className="btn bg-teal-300 text-white">Delete</button></td>: <td><p>---</p></td>
                            }
                            {
                                isAdmin? <td><Link to={`/requestdetails?id=${request._id}`}><button className="btn bg-green-400 text-white">Details/Edit</button></Link></td>: isVolunteer? <td><Link to={`/requestdetails?id=${request._id}`}><button className="btn bg-green-400 text-white">Details</button></Link></td>:<td><p>---</p></td> 
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

export default AllRequests;
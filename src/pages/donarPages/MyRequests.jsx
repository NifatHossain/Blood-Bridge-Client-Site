// import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import useRequests from "../../hooks/useRequests";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import noDataAnimation from "../../../public/noDataFound.json"


const MyRequests = () => {
    // const{user}=useAuth()
    const axiosSecure=useAxiosSecure()
    // useEffect(()=>{
    //     axiosSecure.get(`/getdonationrequests/${user.email}`)
    //     .then(result=>setRequests(result.data))
    //     .catch(error=>console.log(error))
    // },[axiosSecure,user.email])
    const [requests,refetch]=useRequests()
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
    
    return (
        <div className="py-5 bg-teal-50 h-screen">
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">My Requests</h2>
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
                                request.status==='inprogress'?<td><div className="flex flex-col"><button onClick={()=>handleSelectDonar(request._id,'done')}  className="btn bg-green-400 text-white">Done</button><button onClick={()=>handleSelectDonar(request._id,'cancel')} className="btn bg-teal-300 text-white">Cancel</button></div></td>:<td className="text-green-400">{request.status}</td>
                            }
                            <td><button onClick={()=>handleDelete(request._id)} className="btn bg-teal-300 text-white">Delete</button></td>
                            <td><Link to={`/requestdetails?id=${request._id}`}><button className="btn bg-green-400 text-white">Details/Edit</button></Link></td>
                            
                        </tr>
                        <div className="divider w-full"></div> 
                        </tbody>)
                    }
                </table>
            </div>
                </>

            }
            

        </div>
    );
};

export default MyRequests;
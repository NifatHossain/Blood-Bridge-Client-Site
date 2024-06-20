import { Link } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useRequests from "../../hooks/useRequests";
// import Swal from "sweetalert2";
import usePendingRequests from "../../hooks/usePendingRequests";
import noDataAnimation from "../../../public/noDataFound.json"
import Lottie from "lottie-react";

const DonationRequests = () => {
    // const axiosSecure=useAxiosSecure()
    // useEffect(()=>{
    //     axiosSecure.get(`/getdonationrequests/${user.email}`)
    //     .then(result=>setRequests(result.data))
    //     .catch(error=>console.log(error))
    // },[axiosSecure,user.email])
    const [requests]=usePendingRequests()
    // const navigate= useNavigate()
    // const handleDelete=(id)=>{
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     })
    //     .then((result) => {
    //         if (result.isConfirmed) {
            
    //             axiosSecure.delete(`/deleterequest/${id}`)
    //             .then(res=>{
    //                 if(res.data.deletedCount>0){
    //                     refetch();
    //                     Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Your request has been deleted.",
    //                     icon: "success"
    //                     });
    //                 }
    //             })
    //         }
    //     });
    // }
    // const handleSelectDonar=(id,status)=>{
    //     axiosSecure.patch(`modifyrequeststatus?id=${id}&status=${status}`)
    //     .then(Result=>{
    //         if(Result.data.modifiedCount>0){
    //             refetch()
    //             Swal.fire({
    //             title: "Request Accepted",
    //             text: "Thank you for helping someone to survive!!",
    //             icon: "success"
    //             });
    //             navigate('/dashboard/myrequests')
                
    //         }
    //     })
    // }
    
    return (
        <div className="py-5 bg-teal-50 h-screen">
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">All Requests</h2>
            </div>
            {
                (!(requests.length>0))?<>
                    <div className="flex justify-center items-center">
                        <Lottie className=" w-1/2" animationData={noDataAnimation} />
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
                            
                            <td><Link to={`/requestdetails?id=${request._id}`}><button className="btn bg-green-400 text-white">Details</button></Link></td>
                            
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

export default DonationRequests;
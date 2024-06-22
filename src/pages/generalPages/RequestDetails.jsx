import donationAnimation from "../../../public/bloodDonation.json"
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { Helmet } from "react-helmet";


const RequestDetails = () => {
    const {user}=useAuth()
    const [isAdmin]=useAdmin()
    const axiosSecure=useAxiosSecure()
    const navigate= useNavigate()
    const queryParameters = new URLSearchParams(window.location.search)
    const requestId = queryParameters.get("id")
    const [details,setDetails]=useState({})
    useEffect(()=>{
        axiosSecure.get(`getdonationrequestdetails/${requestId}`)
        .then(Result=>setDetails(Result.data))
    },[])
    const handleDonate=()=>{
        const donarName=user.displayName;
        const donarEmail=user.email;
        const donarInfo={donarName,donarEmail}
        Swal.fire({
            title: "Confirm Donation?",
            text: `Name: ${donarName}  Email: ${donarEmail}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2DD4BF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`updaterequeststatus/${requestId}`,donarInfo)
                .then(Result=>{
                    if(Result.data.modifiedCount>0){
                        Swal.fire({
                        title: "Request Accepted",
                        text: "Thank you for helping someone to survive!!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                        });
                        navigate('/')
                        
                    }
                    else{
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                })
            }
          });
        
    }
    return (
        <div className="py-5 bg-teal-50">
            <Helmet>
                <title>Blood Bridge | Donation Details</title>
            </Helmet>
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Request Details</h2>
            </div>
            <div className="flex gap-5">
                <Lottie className=" w-1/2 flex-1 hidden lg:block" animationData={donationAnimation} />
                <div className="flex flex-col items-center flex-1  w-full">
                    <div className=" text-2xl hidden lg:block"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    <div className="flex flex-col gap-3 w-[60%] mt-7">
                        <p className="text-slate-400 text-lg">Posted by(Name): <span className="text-black"> {details.userName}</span></p>
                        <p className="text-slate-400 text-lg">Posted by(email):<span className="text-black"> {details.userEmail}</span></p>

                        <p className="text-slate-400 text-lg">Recipient Name: <span className="text-black">{details.recipientName}</span> </p>
                        
                       
                        <p className="text-slate-400 text-lg">Recipient Blood Group: <span className="text-black">{details.blood_group}</span></p>
                        
                       
                        <p className="text-slate-400 text-lg">Recipient District: <span className="text-black">{details.district}</span></p>
                        
                       
                        <p className="text-slate-400 text-lg">Recipient Upzilla: <span className="text-black">{details.upzilla}</span></p>
                        
                       
                        <p className="text-slate-400 text-lg">Hospital Name: <span className="text-black">{details.hospitalName}</span></p>
                       
                        <p className="text-slate-400 text-lg">Full Address: <span className="text-black">{details.fullAddress}</span></p>
                       
                        <p className="text-slate-400 text-lg">Donation Date: <span className="text-black">{details.donationDate}</span></p>
                       
                        <p className="text-slate-400 text-lg">Donation Time: <span className="text-black">{details.donationTime}</span></p>
                       
                        <p className="text-slate-400 text-lg">Patient&apos;s Details: <span className="text-black">{details.patientDetails}</span></p>
                        <div className="flex w-full gap-4">
                            {
                                details?.status==='pending' && (user.email!=details.userEmail || isAdmin) && <>
                                    <div>
                                        <button onClick={handleDonate} className="btn w-full bg-red-500 text-white">Donate</button>
                                    </div>
                                </>
                            }
                            {
                                (details?.status==='pending' && (user.email===details.userEmail || isAdmin)) &&<>
                                    <Link to={`/dashboard/updaterequest?id=${details._id}`}><button className="btn w-full bg-teal-400 text-white">Update</button></Link>
                                </>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;
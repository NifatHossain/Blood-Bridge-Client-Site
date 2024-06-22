import Lottie from "lottie-react";
import donationAnimation from "../../../public/bloodDonation.json"
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const CreateRequest = () => {
    const [districts, setDistricts]=useState([])
    const [upazilas, setUpazilas]=useState([])
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const navigate= useNavigate()
    useEffect(()=>{
        fetch('/districts.json')
    .then(res=>res.json())
    .then(data=>setDistricts(data[2].data))
    },[])
    useEffect(()=>{
        fetch('/upazilas.json')
    .then(res=>res.json())
    .then(data=>setUpazilas(data[2].data))
    },[])

    
    // console.log(upazilas[0])
    const { register,handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async(data) => {
        data.userName=user.displayName;
        data.userEmail=user.email;
        data.status='pending'
        console.log(data);
        axiosSecure.post('/donationrequest',data)
        .then((result)=>{
                if(result.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Requested for Donation",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/myrequests')
                }
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    return (
        <div className="py-5 bg-teal-50">
            <Helmet>
                <title>Blood Bridge | Create Request</title>
            </Helmet>
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4">Create new Request</h2>
            </div>
            <div className="flex gap-5">
                <Lottie className=" w-1/2 flex-1 hidden" animationData={donationAnimation} />
                <div className="flex flex-col items-center flex-1  w-full">
                    <div className=" text-2xl"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    <form className="flex flex-col gap-3 w-[60%] mt-7" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="border-2 rounded-sm p-2" disabled defaultValue={user.displayName} placeholder="name" {...register("userName")} />
                        <input type="email" className="border-2 rounded-sm p-2" disabled defaultValue={user.email} placeholder="email" {...register("userEmail")} />

                        <p className="text-slate-400">Enter Recipient Name: </p>
                        <input type="text" className="border-2 rounded-sm p-2" placeholder="Recipient Name" {...register("recipientName", {required: true})} />
                        {errors.name && <p className="text-red-500">Enter Recipient name</p>}
                        <p className="text-slate-400">Enter Recipient Blood Group: </p>
                        <select className="border-2 rounded-sm p-2" {...register("blood_group", { required: 'required field '})}>
                            <option value="">Enter Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.blood_group && <p className="text-red-500">blood group required</p>}
                        <p className="text-slate-400">Enter Recipient District: </p>
                        <select className="border-2 p-2 rounded-sm" {...register("district", { required: true })}>
                            <option value="Dhaka">Select District</option>
                            {
                                districts.map(district=><option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>
                        {errors.district && <p className="text-red-500">Secect District</p>}
                        <p className="text-slate-400">Enter Recipient Upzilla: </p>
                        <select className="border-2 p-2 rounded-sm pt-0" {...register("upzilla", { required: true })}>
                            <option value="Dhaka">Select Upzilla</option>
                            {
                                upazilas.map(upazila=><option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                            }
                        </select>
                        {errors.upazila && <p className="text-red-500">Secect Upazila</p>}
                        <p className="text-slate-400">Enter Hospital Name </p>
                        <input type="text" className="border-2 rounded-sm p-2" placeholder="hospitalName" {...register("hospitalName", {required: true})} />
                        {errors.hospitalName && <p className="text-red-500">Enter Hospital name</p>}
                        <p className="text-slate-400">Enter Full Address </p>
                        <input type="text" className="border-2 rounded-sm p-2" placeholder="fullAddress" {...register("fullAddress", {required: true})} />
                        {errors.fullAddress && <p className="text-red-500">Enter Full Address</p>}
                        <p className="text-slate-400">Enter Donation Date </p>
                        <input type="date" className="border-2 rounded-sm p-2" placeholder="donationDate" {...register("donationDate", {required: true})} />
                        {errors.donationDate && <p className="text-red-500">Enter donation Date</p>}
                        <p className="text-slate-400">Enter Donation Time </p>
                        <input type="time" className="border-2 rounded-sm p-2" placeholder="donationTime" {...register("donationTime", {required: true})} />
                        {errors.donationTime && <p className="text-red-500">Enter donation Time</p>}
                        <p className="text-slate-400">Enter Patient&apos;s condition </p>
                        <input type="text" className="border-2 rounded-sm p-2" placeholder="patientDetails" {...register("patientDetails", {required: true})} />
                        {errors.patientDetails && <p className="text-red-500">Enter patient&apos;s Details</p>}
                        
                        <input type="submit"className="btn" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateRequest;
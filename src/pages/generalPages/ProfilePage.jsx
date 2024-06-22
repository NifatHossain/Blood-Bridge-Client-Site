
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import useAuth from "../../hooks/useAuth";
import useProfileInfo from "../../hooks/useProfileInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const imageHostingKey = import.meta.env.VITE_imageHostingKey
const imageHostingApi= `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const ProfilePage = () => {
    const {user}=useAuth()
    const [districts, setDistricts]=useState([])
    const [upazilas, setUpazilas]=useState([])
    const [allowUpdate, setAllowUpdate]=useState(false)
    const [allowImageUpdate, setAllowImageUpdate]=useState(false)
    const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    const {updateUserInfo}=useContext(AuthContext)
    const [profileInfo,refetch]=useProfileInfo()
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
        const name= data.name;
        console.log(data)
        // console.log(profileInfo)
        // setAllowUpdate(false)
        var image='';
        if(allowImageUpdate){
            const imageFile= {image:data.image[0]}
            const result= await axiosPublic.post(imageHostingApi,imageFile,{
                headers:{
                    "Content-Type": 'multipart/form-data'
                }
            })
            // console.log(result.data.data.display_url)
            image=result.data.data.display_url;
        }
        else{
            image=profileInfo.image
        }
        data.image=image;
        updateUserInfo(name,image)
        .then(()=>{
            axiosSecure.patch(`updateprofiledata/${user.email}`,data)
            .then(Result=>{
                if(Result.data.modifiedCount>0){
                    Swal.fire({
                        title: "Modified",
                        text: "Your Data is now updated",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                    setAllowUpdate(false)
                    allowImageUpdate(false)
                }
                else{
                    Swal.fire({
                        title: "Modification failed",
                        text: "Your Data was not updated",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch((error)=>{
                console.log(error)
            })
                    
            
        })
            
        
            

    }

    const handleUpdate=()=>{
        setAllowUpdate(true)
    }
    const handleImageUpdate=()=>{
        setAllowImageUpdate(true)
    }
    // console.log(errors);
    return (
        <div className="bg-teal-50 min-h-screen">
            <h2 className="text-center text-2xl font-semibold p-3 bg-slate-100 rounded-md mb-4 mt-10">My Profile</h2>
            <div className="flex gap-5">
                {/* <div className="hidden md:block w-1/2 flex-1">
                    <Lottie  animationData={registerAnimation2} />
                </div> */}
                <div className="flex flex-col items-center flex-1  w-full mb-6">
                    <div className=" text-2xl hidden md:block"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    {
                        allowUpdate ? <div className="w-[80%] md:w-[60%]">
                        <form className="flex flex-col gap-3 w-full mt-7" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="border-2 rounded-sm p-2" defaultValue={profileInfo.name} placeholder={user.displayName} {...register("name")} />
                            
                            <input type="email" className="border-2 rounded-sm p-2" disabled defaultValue={profileInfo.email} placeholder={profileInfo.email} {...register("email")} />
                            
                            <input type="date" className="border-2 rounded-sm p-2" defaultValue={profileInfo.birthDate} placeholder="birthDate" {...register("birthDate")} />
                            
                            {
                                allowImageUpdate ?<div> <input type="file" className="border file-input w-full max-w-xs" placeholder="image" {...register("image", {required: true})} />
                                {errors.image && <p className="text-red-500">Enter a image file</p>}
                                </div>:<button onClick={handleImageUpdate} className="bg-teal-400 w-1/2 text-white btn">Update Image?</button>
                            }
                            
                            <p className="text-slate-400">Enter Gender: </p>
                            <select defaultValue={profileInfo.gender} className="border-2 rounded-sm p-2" {...register("gender")}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            
                            <p className="text-slate-400">Enter Your District: </p>
                            <select defaultValue={profileInfo.district} className="border-2 p-2 rounded-sm" {...register("district")}>
                                <option value="Dhaka">Select District</option>
                                {
                                    districts.map(district=><option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                            
                            <p className="text-slate-400">Enter Your Upzilla: </p>
                            <select defaultValue={profileInfo.upzilla} className="border-2 p-2 rounded-sm pt-0" {...register("upzilla")}>
                                <option value="Dhaka">Select Upzilla</option>
                                {
                                    upazilas.map(upazila=><option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                            
                            <p className="text-slate-400">Enter Blood Group: </p>
                            <select defaultValue={profileInfo.blood_group} className="border-2 rounded-sm p-2" {...register("blood_group")}>
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
                            
                            
                            <input type="submit"className="btn" />
                        </form>
                        
                    </div>:<div className="flex flex-col gap-3 w-[60%] mt-7">
                        <div className="flex justify-center avatar">
                            <img className="max-w-52 max-h-52 rounded-full" src={profileInfo.image} alt="" />
                        </div>
                        <p className="text-slate-400 text-lg">Name: <span className="text-black"> {profileInfo.name}</span></p>
                        <p className="text-slate-400 text-lg">Email:<span className="text-black"> {profileInfo.email}</span></p>

                
                        <p className="text-slate-400 text-lg">Blood Group: <span className="text-black">{profileInfo.blood_group}</span></p>
                        <p className="text-slate-400 text-lg">Birth Date: <span className="text-black">{profileInfo.birthDate}</span></p>
                        <p className="text-slate-400 text-lg">Gender: <span className="text-black">{profileInfo.gender}</span></p>
                        
                       
                        <p className="text-slate-400 text-lg">District: <span className="text-black">{profileInfo.district}</span></p>
                        
                       
                        <p className="text-slate-400 text-lg">Upzilla: <span className="text-black">{profileInfo.upzilla}</span></p>
                        
                        <button onClick={handleUpdate} className="bg-teal-400 text-white btn">Update</button>
                        
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
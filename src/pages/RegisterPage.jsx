import Lottie from "lottie-react";
import registerAnimation2 from "../../public/registerLootie.json"
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const imageHostingKey = import.meta.env.VITE_imageHostingKey
const imageHostingApi= `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const RegisterPage = () => {
    const [districts, setDistricts]=useState([])
    const [upazilas, setUpazilas]=useState([])
    const axiosPublic=useAxiosPublic()
    const location=useLocation()
    const navigate= useNavigate()
    const {signUp,updateUserInfo}=useContext(AuthContext)
    useEffect(()=>{
        fetch('../../public/districts.json')
    .then(res=>res.json())
    .then(data=>setDistricts(data[2].data))
    },[])
    useEffect(()=>{
        fetch('../../public/upazilas.json')
    .then(res=>res.json())
    .then(data=>setUpazilas(data[2].data))
    },[])

    
    // console.log(upazilas[0])
    const { register,handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async(data) => {
        const name= data.name;
        const email= data.email
        const password=data.password
        const imageFile= {image:data.image[0]}
        const result= await axiosPublic.post(imageHostingApi,imageFile,{
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        })
        // console.log(result.data.data.display_url)
        const image=result.data.data.display_url;
        data.image=image;
        data.role='donar'
        data.password='N/A'
        data.status='active'
        console.log(data);
        // const role='donar'
        const newData= {name,image,email,password}
        console.log(newData)
        // const userInfo={name,email,role}
        signUp(email,password)
            .then(result=>{
                const user= result.user;
                console.log(user)
                updateUserInfo(name,image)
                .then(()=>{
                    axiosPublic.post('/adduser',data)
                    .then((result)=>{
                         if(result.data.insertedId){
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Successfully Registered User",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate(location?.state? location.state:'/')
                         }
                    })
                    
                })
                .catch((error)=>{
                    console.log(error)
                })
            })
            .catch(error=>{
                console.log(error.message)
            })

    }
    // console.log(errors);
    return (
        <div className="bg-teal-50">
            <h2 className="text-center text-2xl font-semibold p-3 bg-slate-100 rounded-md mb-4">Registration Page</h2>
            <div className="flex gap-5">
                <div className="hidden md:block w-1/2 flex-1">
                    <Lottie  animationData={registerAnimation2} />
                </div>
                <div className="flex flex-col items-center flex-1  w-full mb-6">
                    <div className=" text-2xl hidden md:block"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    <div className="w-[60%]">
                        <form className="flex flex-col gap-3 w-full mt-7" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="border-2 rounded-sm p-2" placeholder="name" {...register("name", {required: true})} />
                            {errors.name && <p className="text-red-500">Enter your name</p>}
                            <input type="email" className="border-2 rounded-sm p-2" placeholder="email" {...register("email", {required: true})} />
                            {errors.name && <p className="text-red-500">Enter your email</p>}
                            <input type="date" className="border-2 rounded-sm p-2" placeholder="birthDate" {...register("birthDate", {required: true})} />
                            {errors.name && <p className="text-red-500">Enter Birth Date</p>}
                            <p className="text-slate-400">upload Your image </p>
                            <input type="file" className="border file-input w-full max-w-xs" placeholder="image" {...register("image", {required: true})} />
                            {errors.image && <p className="text-red-500">Enter a image file</p>}
                            <p className="text-slate-400">Enter Gender: </p>
                            <select className="border-2 rounded-sm p-2" {...register("gender", { required: true })}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className="text-red-500">Secect your gender</p>}
                            <p className="text-slate-400">Enter Your District: </p>
                            <select className="border-2 p-2 rounded-sm" {...register("district", { required: true })}>
                                <option value="Dhaka">Select District</option>
                                {
                                    districts.map(district=><option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                            {errors.district && <p className="text-red-500">Secect your District</p>}
                            <p className="text-slate-400">Enter Your Upzilla: </p>
                            <select className="border-2 p-2 rounded-sm pt-0" {...register("upzilla", { required: true })}>
                                <option value="Dhaka">Select Upzilla</option>
                                {
                                    upazilas.map(upazila=><option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                            {errors.upazila && <p className="text-red-500">Secect your Upazila</p>}
                            <p className="text-slate-400">Enter Blood Group: </p>
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
                            <input className="border-2 rounded-sm p-2" type="password" placeholder="password" {...register("password", {required: true, minLength:6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/})} /> 
                            {errors.password?.type === "required" && (
                                <p className="text-red-500">Password name is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500">Password must contain 6 character</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500">Password must contain atleast a lower case, a uppercase and a number</p>
                            )}
                            <input type="submit"className="btn" />
                        </form>
                        <p className="mt-4">Already have an account? <Link to={'/login'} className="text-blue-700">SignIn</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
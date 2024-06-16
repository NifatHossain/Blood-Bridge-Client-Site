import Lottie from "lottie-react";
import registerAnimation2 from "../../public/registerLootie.json"
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";

const RegisterPage = () => {
    const [districts, setDistricts]=useState([])
    const [upazilas, setUpazilas]=useState([])
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
    
    const onSubmit = data => {
        console.log(data);
    }
    // console.log(errors);
    return (
        <div>
            <h2 className="text-center text-2xl font-semibold p-3 bg-slate-100 rounded-md mb-4">Registration Page</h2>
            <div className="flex gap-5">
                <Lottie className=" w-1/2 flex-1" animationData={registerAnimation2} />
                <div className="flex flex-col items-center flex-1  w-full">
                    <div className=" text-2xl"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    <form className="flex flex-col gap-3 w-[60%] mt-7" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="border-2 rounded-sm p-2" placeholder="name" {...register("name", {required: true})} />
                        {errors.name && <p className="text-red-500">Enter your name</p>}
                        <input type="email" className="border-2 rounded-sm p-2" placeholder="email" {...register("email", {required: true})} />
                        {errors.name && <p className="text-red-500">Enter your email</p>}
                        <input type="date" className="border-2 rounded-sm p-2" placeholder="birthDate" {...register("birthDate", {required: true})} />
                        {errors.name && <p className="text-red-500">Enter Birth Date</p>}
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
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
import Lottie from "lottie-react";
import registerAnimation2 from "../../../public/Animation - 1718456224514.json"
import noDataAnimation from "../../../public/noDataFound.json"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SearchDonar = () => {
    const [districts, setDistricts]=useState([])
    const [upazilas, setUpazilas]=useState([])
    const [hide, setHide]=useState(false)
    const [donars,setDonars]=useState([])
    const axiosPublic=useAxiosPublic()
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
    const { register,handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
        // console.log(data);
        const district = encodeURIComponent(data.district);
        const upzilla = encodeURIComponent(data.upzilla);
        const blood_group = encodeURIComponent(data.blood_group);
        axiosPublic.get(`searchdonar?district=${district}&upzilla=${upzilla}&blood_group=${blood_group}`)
        .then(Result=>setDonars(Result.data))
        setHide(true)
        reset()
    }
    const handleSearchAgain=()=>{
        setHide(false)
    }
    return (
        <div className="py-5 bg-teal-50 min-h-screen">
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Search Donar</h2>
            </div>
            <div className={hide?'hidden':'flex items-center gap-4 justify-center'}>
                <div className="hidden md:block w-1/2 flex-1">
                    <Lottie  animationData={registerAnimation2} />
                </div>
                <div className="flex flex-col items-center flex-1  w-full mb-6">
                    <div className=" text-2xl hidden md:block"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    <div className="w-[60%]">
                        <form className="flex flex-col gap-3 w-full mt-7" onSubmit={handleSubmit(onSubmit)}>
                            
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
                            
                            <input type="submit"className="btn" />
                        </form>
                        
                    </div>
                </div>
            </div>
            <div className={(!hide)?'hidden':''}>
                {
                    (!(donars.length>0))?<>
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
                        <th>Blood Group</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    {
                        donars.map((donar,idx)=><tbody key={idx}>
                        <tr>
                            <th>{idx+1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={donar.image} alt="userImage" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{donar.name}</div>
                                    {/* <div className="text-sm opacity-50">United States</div> */}
                                    </div>
                                </div>
                            </td>
                            <td>{donar.email}</td>
                            <td>{donar.blood_group}</td>
                            <td>{donar.status}</td>
                        </tr>
                        </tbody>)
                        }
                </table>
                </div>
                </>
                }
                <div className="flex justify-center bg-teal-50 pt-4 pb-10">
                    <button onClick={handleSearchAgain} className="btn bg-teal-400 text-white">Search Again</button>
                </div>
            </div>
            
        </div>
    );
};

export default SearchDonar;
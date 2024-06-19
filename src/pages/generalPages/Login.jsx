import Lottie from "lottie-react";
import registerAnimation2 from "../../../public/Animation - 1718456224514.json"
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";


const Login = () => {
    const {signIn}=useAuth()
    // const location=useLocation()
    const navigate= useNavigate()
    const { register,handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
        console.log(data);
        const email=data.email;
        const password=data.password;
        signIn(email,password)
        .then(result=>{
            const user= result.user;
            console.log(user);
            Swal.fire({
                title: "success",
                text: "login successfull",
                icon: "success"
            });
            navigate(location?.state? location.state:'/')
        })
        .catch(error=>{
            console.log(error.message)
            Swal.fire({
                title: "Error",
                text: "Wrong Email or Password",
                icon: "error"
            });
        })
    }
    return (
        <div>
            <h2 className="text-center text-2xl font-semibold p-3 bg-slate-100 rounded-md ">Login Page</h2>
            <div className="flex items-center gap-5">
                <Lottie className=" w-1/2 flex-1" animationData={registerAnimation2} />
                <div className="flex flex-col items-center flex-1  w-full">
                    <div className=" text-2xl"><div className="flex flex-col items-center"><div><span className="text-red-500">Blood</span> Bridge</div><p className="text-xs font-light text-red-500">Connecting Doners, Saving Lives</p></div></div>
                    <div className="w-[60%] ">
                        <form className="flex flex-col gap-3 w-full mt-7" onSubmit={handleSubmit(onSubmit)}>
                            
                            <input type="email" className="border-2 rounded-sm p-2" placeholder="email" {...register("email", {required: true})} />
                            {errors.name && <p className="text-red-500">Enter your email</p>}
                            
                            <input className="border-2 rounded-sm p-2" type="password" placeholder="password" {...register("password", {required: true})} /> 
                            {errors.password?.type === "required" && (
                                <p className="text-red-500">Password name is required</p>
                            )}
                            <input type="submit"className="btn" />
                        </form>
                        <p className="mt-4">Don&apos;t have an account? <Link to={'/register'} className="text-blue-500">Register</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
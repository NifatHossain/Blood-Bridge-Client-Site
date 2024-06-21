import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const ContactUs = () => {
    const { register,handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
        console.log(data)
        Swal.fire({
            icon: "success",
            title: "your message sent successfully",
            showConfirmButton: false,
            timer: 1500
        });
        reset()
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 items-center bg-teal-50 px-4 py-8 my-3 md:my-10 ">
            <div className="space-y-3 ">
                <h1 className="text-5xl font-semibold"><span className="md:border-b-2 border-red-500">GET</span> IN TOUCH</h1>
                <p className="font-medium text-lg">Our dedicate support team is always ready to help you out. Submit Your details and our team will contact you as soon as possible</p>
                <button className="cursor-pointer font-medium bg-red-500 text-white p-5">DETAILS</button>
            </div>
            {/* <div className="card max-w-2xl  rounded-none card-side bg-base-100 shadow-xl"> */}
            <form className="flex flex-col gap-3 w-[100%] md:w-[100%] md:mt-7 p-5 border md:border-0 shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className="border-2 rounded-sm p-2" placeholder="name" {...register("name", {required: true})} />
                    {errors.name && <p className="text-red-500">Enter your name</p>}
                    <input type="email" className="border-2 rounded-sm p-2" placeholder="email" {...register("email", {required: true})} />
                    {errors.name && <p className="text-red-500">Enter your email</p>}
                    <p className="text-slate-400">Required Blood Group: </p>
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
    );
};

export default ContactUs;
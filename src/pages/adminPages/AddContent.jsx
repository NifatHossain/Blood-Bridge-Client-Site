import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const imageHostingKey = import.meta.env.VITE_imageHostingKey
const imageHostingApi= `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const AddContent = () => {
    const {user}=useAuth()
    const { register,handleSubmit,reset, formState: { errors } } = useForm();
    const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    const onSubmit = async(data) => {
        console.log(data)
        const imageFile= {image:data.image[0]}
        const result= await axiosPublic.post(imageHostingApi,imageFile,{
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        })
        // console.log(result.data.data.display_url)
        const image=result.data.data.display_url;
        data.image=image;
        data.status='draft'
        data.authorName= user.displayName;
        data.authorEmail= user.email;
        console.log(data)
        axiosSecure.post('/createcontent',data)
        .then((result)=>{
                if(result.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Uploaded Content",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                }
        })
    }
    return (
        <div>
            <Helmet>
                <title>Blood Bridge | Add Content</title>
            </Helmet>
            <div className="flex justify-center bg-teal-50 min-h-screen">
                <div className="w-[60%]">
                    <form className="flex flex-col gap-3 w-full mt-7" onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-slate-400">Enter Article Title: </p>
                        <input type="text" className="border-2 rounded-sm p-2" placeholder="title" {...register("title", {required: true})} />
                        {errors.title && <p className="text-red-500">Enter Title</p>}
                        <p className="text-slate-400">upload Your image </p>
                        <input type="file" className="border file-input w-full max-w-xs" placeholder="image" {...register("image", {required: true})} />
                        {errors.image && <p className="text-red-500">Enter a image file</p>}
                        <p className="text-slate-400">Write Article: </p>
                        <textarea  className="border-2 rounded-sm p-2" placeholder="article..." {...register("article", {required: true})} />
                        {errors.article && <p className="text-red-500">Write you Article</p>}
                        <input type="submit"className="btn" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContent;
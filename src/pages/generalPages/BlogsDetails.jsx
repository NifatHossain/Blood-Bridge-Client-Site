import { Helmet } from "react-helmet";


const BlogsDetails = () => {
    return (
        <div className="py-5 bg-teal-50 h-screen">
            <Helmet>
                <title>Blood Bridge | Blog Details</title>
            </Helmet>
            <div className="flex justify-center">
                <h2 className="text-center text-2xl w-[70%] px-6 font-semibold p-3 bg-teal-300 rounded-md mb-4 text-white">Blog Details</h2>
            </div>
            
        </div>
    );
};

export default BlogsDetails;
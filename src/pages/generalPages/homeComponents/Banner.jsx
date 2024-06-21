import { Slide } from "react-awesome-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";


const Banner = () => {
    return (
            <div>
            <Carousel className="" autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div className="bg-cover bg-center h-[250px] md:h-[550px] flex flex-col justify-center items-start p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/hyWMNjF/home-1-slider-2.jpg')"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div> 
                    <div className="w-1/2">
                        <Slide className="z-10 text-white text-4xl">Join As a Doner</Slide> <br />
                        <Slide direction="right"><Link to={'/register'}><button className="btn z-10">Join Now</button></Link></Slide>
                    </div>
                </div>
                <div className="bg-cover bg-center h-[250px] md:h-[550px] flex flex-col justify-center items-start p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/nc3LQjC/home-1-slider-1.jpg"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="w-1/2">
                        <Slide className="z-10 text-white text-4xl">Search Donars</Slide> <br />
                        <Slide direction="right"><Link to={'/searchdonar'}><button className="btn z-10">Search Now</button></Link></Slide>
                    </div>
                </div>
                <div className="bg-cover bg-center h-[250px] md:h-[550px] flex flex-col justify-center items-center p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/gjHwDvM/testimony-feat-bg.jpg')"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="w-1/2">
                        <Slide className="z-10 text-white text-4xl">Show Donation Requests</Slide> <br />
                        <Slide direction="right"><Link to={'/donationrequests'}><button className="btn z-10">Show</button></Link></Slide>
                    </div> 
                </div>
                
            </Carousel>
        </div>
    );
};

export default Banner;
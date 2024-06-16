import { Slide } from "react-awesome-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
            <div>
            <Carousel className="" autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div className="bg-cover bg-center h-[250px] md:h-[550px] flex flex-col justify-center items-start p-5 lg:px-40" style={{backgroundImage: "url('https://templates.bwlthemes.com/blood_donation/v_2/images/home_1_slider_2.jpg')"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div> 
                    <div className="w-1/2">
                        <Slide className="z-10 text-white text-4xl">Join As a Doner</Slide> <br />
                        <Slide direction="right"><button className="btn z-10">Join Now</button></Slide>
                    </div>
                </div>
                <div className="bg-cover bg-center h-[250px] md:h-[550px] flex flex-col justify-center items-start p-5 lg:px-40" style={{backgroundImage: "url('https://templates.bwlthemes.com/blood_donation/v_2/images/home_1_slider_1.jpg"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="w-1/2">
                        <Slide className="z-10 text-white text-4xl">Search Donars</Slide> <br />
                        <Slide direction="right"><button className="btn z-10">Search Now</button></Slide>
                    </div>
                </div>
                <div className="bg-cover bg-center h-[250px] md:h-[550px] flex flex-col justify-center items-center p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/gjHwDvM/testimony-feat-bg.jpg')"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="w-1/2">
                        <Slide className="z-10 text-white text-4xl">Show Donation Requests</Slide> <br />
                        <Slide direction="right"><button className="btn z-10">Show</button></Slide>
                    </div> 
                </div>
                
            </Carousel>
        </div>
    );
};

export default Banner;
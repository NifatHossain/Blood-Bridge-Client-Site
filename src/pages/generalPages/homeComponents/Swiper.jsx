

const Swiper = () => {
    return (
        <div>
            <Swiper
                // spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper"
            >
                <SwiperSlide> 
                    <div className="bg-cover bg-center h-[250px] md:h-[430px] flex flex-col justify-center items-center p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/zP3M0Sg/slider1.jpg')"}}>
                            <div className="absolute inset-0 bg-black opacity-40"></div>
                            <Slide direction='down'><h2 className='text-xl  text-white text-center'>Discover Handcrafted Ceramic Delights Online</h2></Slide>
                            <Fade duration={3000}><h1 className='text-4xl my-5 font-semibold text-white text-center'>Craft Your Home Oasis</h1></Fade>
                            <Slide direction='up'><h2 className='text-xl  text-white text-center'>Transform your living space into a sanctuary of style with our exquisite range of artisanal ceramics.Each piece is lovingly crafted to infuse your home with elegance and personality</h2></Slide>
                    </div>
                </SwiperSlide>
                <SwiperSlide> 

                    <div className="bg-cover bg-center h-[250px] md:h-[430px] flex flex-col justify-center items-center p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/8csP9xr/slider3.jpg')"}}>
                            <div className="absolute inset-0 bg-black opacity-40"></div>
                            <Slide direction='down'><h2 className='text-xl  text-white text-center'>Shop Unique Pottery Creations for Your Dining Table</h2></Slide>
                            <Fade duration={3000}><h1 className='text-4xl my-5 font-semibold text-white text-center'>Elevate Every Meal</h1></Fade>
                            <Slide direction='up'><h2 className='text-xl  text-white text-center'>Turn every meal into a culinary masterpiece with our curated collection of pottery wonders. All designed to add a touch of artisanal charm to your dining experience.</h2></Slide>
                    </div>
                </SwiperSlide>
                <SwiperSlide> 
                    <div className="bg-cover bg-center h-[250px] md:h-[430px] flex flex-col justify-center items-center p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/grB4zfy/slider2.jpg')"}}>
                            <div className="absolute inset-0 bg-black opacity-40"></div>
                            <Slide direction='down'><h2 className='text-xl  text-white text-center'>Unearth Timeless Treasures in Ceramic Art</h2></Slide>
                            <Fade duration={3000}><h1 className='text-4xl my-5 font-semibold text-white text-center'>Gifts That Gladden the Heart</h1></Fade>
                            <Slide direction='up'><h2 className='text-xl  text-white text-center'>Delight your loved ones with gifts that speak to the soul. Browse through our selection of hand-painted ceramics each one a testament to the enduring beauty of artistic craftsmanship.</h2></Slide>
                    </div>
                </SwiperSlide>
                <SwiperSlide> 
                    <div className="bg-cover bg-center h-[250px] md:h-[430px] flex flex-col justify-center items-center p-5 lg:px-40" style={{backgroundImage: "url('https://i.ibb.co/9vnKVtp/slider4.jpg')"}}>
                            <div className="absolute inset-0 bg-black opacity-40"></div>
                            <Slide direction='down'><h2 className='text-xl  text-white text-center'>Join Our Exclusive Pottery Class for All Skill Levels</h2></Slide>
                            <Fade duration={3000}><h1 className='text-4xl my-5 font-semibold text-white text-center'>Unleash Your Inner Artist</h1></Fade>
                            <Slide direction='up'><h2 className='text-xl  text-white text-center'>Embark on a journey of creativity and self-discovery with our signature pottery class. Experience the joy of molding raw clay into stunning works of art in a supportive and inspiring environment. </h2></Slide>
                    </div>
                </SwiperSlide>
                
                
            </Swiper> 
        </div>
    );
};

export default Swiper;
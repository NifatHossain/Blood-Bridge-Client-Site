import Banner from "./homeComponents/Banner";
import ContactUs from "./homeComponents/ContactUs";
import Footer from "./homeComponents/Footer";
import RecentCampains from "./homeComponents/RecentCampains";


const Home = () => {
    return (
        <div className="bg-teal-50">
            <Banner></Banner>
            <RecentCampains></RecentCampains>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;
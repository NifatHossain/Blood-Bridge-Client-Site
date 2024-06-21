import Banner from "./homeComponents/Banner";
import Footer from "./homeComponents/Footer";
import RecentCampains from "./homeComponents/RecentCampains";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentCampains></RecentCampains>
            <Footer></Footer>
        </div>
    );
};

export default Home;
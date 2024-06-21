import { BsCalendarDate } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";


const RecentCampains = () => {
    return (
        <div className="flex flex-col gap-6 md:gap-0 md:flex-row items-center bg-teal-50 px-4 py-4">
            <div className="space-y-3 max-w-2xl">
                <h1 className="text-5xl font-semibold"><span className="md:border-b-2 border-red-500">OUR</span> CAMPAINS</h1>
                <p className="font-medium text-lg">All over the country we have arranged around hundred donation campaigns and visit other venues on various occasions.</p>
                <button className="cursor-pointer font-medium bg-red-500 text-white p-5">LOAD ALL CAMPAINS</button>
            </div>
            <div className="card max-w-2xl flex flex-col md:flex-row  rounded-none card-side bg-base-100 shadow-xl">
                <figure className="h-full"><img src="https://i.ibb.co/QKPWhb2/event-1.webp" alt="donation image"/></figure>
                <div className="card-body">
                    <div className="flex items-center gap-4">
                        <BsCalendarDate className="text-red-500" />
                        <p>24 February, 2024</p>
                    </div>
                    <h2 className="card-title">Open Blood Donation</h2>
                    <p>Join our Open Blood Donation Campaign! Your donation can save lives. Come, donate blood, and be a hero. Every drop counts. Let&apos;s make a difference together!</p>
                    <div className="card-actions">
                        <div className="flex gap-7">
                            <div className="flex gap-1 items-center">
                                <FaRegClock className="text-red-500" />
                                <p>09.00-3.30</p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <SiGooglemaps className="text-red-500" />
                                <p>North South University</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentCampains;
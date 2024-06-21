import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import Home from "../src/pages/generalPages/Home";
import RegisterPage from "../src/pages/RegisterPage";
import Dashboard from "../src/layouts/Dashboard";
import PrivateRoute from "../src/provider/PrivateRoute";
import DonationRequests from "../src/pages/generalPages/DonationRequests";
import Blogs from "../src/pages/generalPages/Blogs";
import Login from "../src/pages/generalPages/Login";
import AdminHome from "../src/pages/adminPages/AdminHome";
import AllDonars from "../src/pages/adminPages/AllDonars";
import AllRequests from "../src/pages/adminPages/AllRequests";
import ContentManage from "../src/pages/adminPages/ContentManage";
import MyRequests from "../src/pages/donarPages/MyRequests";
import CreateRequest from "../src/pages/donarPages/CreateRequest";
import RequestDetails from "../src/pages/generalPages/RequestDetails";
import DonarHome from "../src/pages/donarPages/DonarHome";
import UpdateRequest from "../src/pages/donarPages/UpdateRequest";
import ErrorPage from "../src/pages/generalPages/ErrorPage";
import AddContent from "../src/pages/adminPages/AddContent";
import BlogsDetails from "../src/pages/generalPages/BlogsDetails";
import SearchDonar from "../src/pages/generalPages/SearchDonar";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/register',
            element:<RegisterPage></RegisterPage>

        },
        {
            path:'/donationrequests',
            element:<DonationRequests></DonationRequests>
        },
        {
            path:'/blogs',
            element:<Blogs></Blogs>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/requestdetails',
            element:<PrivateRoute><RequestDetails></RequestDetails></PrivateRoute>
        },
        {
            path:'/articledetails',
            element:<BlogsDetails></BlogsDetails>
        },
        {
            path: '/searchdonar',
            element:<SearchDonar></SearchDonar>
        }
    ]
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
        {
            path:'adminhome',
            element:<AdminHome></AdminHome>
        },
        {
            path:'alldonars',
            element:<AllDonars></AllDonars>
        },
        {
            path: 'allrequests',
            element:<AllRequests></AllRequests>
        },
        {
            path: 'contentsmanagement',
            element:<ContentManage></ContentManage>,
            children:[
                {
                    path:'addcontent',
                    element:<AddContent></AddContent>
                }
            ]
        },
        {
            path:'myrequests',
            element:<MyRequests></MyRequests>
        },
        {
            path:'createrequest',
            element:<CreateRequest></CreateRequest>
        },
        {
            path:'donarhome',
            element:<DonarHome></DonarHome>
        },
        {
            path:'updaterequest',
            element:<UpdateRequest></UpdateRequest>
        }

    ]
  }
]);

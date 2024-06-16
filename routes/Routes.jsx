import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import Home from "../src/pages/generalPages/Home";
import RegisterPage from "../src/pages/RegisterPage";
import Dashboard from "../src/layouts/Dashboard";
import PrivateRoute from "../src/provider/PrivateRoute";
import DonationRequests from "../src/pages/generalPages/DonationRequests";
import Blogs from "../src/pages/generalPages/Blogs";
import Login from "../src/pages/generalPages/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
        }
    ]
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
        {
            path:'adminhome',
            element:
        }
    ]
  }
]);

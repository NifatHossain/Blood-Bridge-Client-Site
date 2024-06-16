import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import Home from "../src/pages/generalPages/Home";
import RegisterPage from "../src/pages/RegisterPage";


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

        }
    ]
  },
  {
    path:"/dashboard",
    element:
  }
]);

import {createBrowserRouter} from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/LoginForm.jsx";
import Register from "../page/Register"
import Users from "../page/Users";
import Notfound from "../page/Notfound.jsx";
import Layout from "../layouts/layout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout.jsx";
import StudentDashboard from "../components/Student/StudentDashboard.jsx";

export const LOGIN_ROUTE = '/login'
export const STUDENT_DASHBOARD_ROUTE = '/student/dashboard'
export const router = createBrowserRouter([


    {
       element:<Layout/> ,
        children:[
            {
                path: '/',
                element: <Home/>
            },
            
          
            {
                path: '/signup',
                element: <Register/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '*',
                element: <Notfound/>
            },
           

        ]
    } ,
    {
        element:<GuestLayout/>,
        children :[  {
            path: LOGIN_ROUTE,
            element: <Login/>
        }, ]
    },
    {
        element:<StudentDashboardLayout/>,
        children :[  {
            path: STUDENT_DASHBOARD_ROUTE,
            element: <StudentDashboard/>
        }, ]
    }



])

import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/LoginForm.jsx";
import Register from "../page/Register";
import Users from "../page/Users";
import Notfound from "../page/Notfound.jsx";
import Layout from "../layouts/layout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import StudentDashboard from "../components/Student/StudentDashboard.jsx";
import StudentDashboardLayout from "../layouts/Student/StudentDashboardLayout.jsx";
import CreateItineraryForm from "../components/Itenerary/CreateItenerary.jsx";
import Iteneraries from "../components/Itenerary/Iteneraries.jsx";
import UpdateItenerary from "../components/Itenerary/UpdateItenerary.jsx";

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const STUDENT_DASHBOARD_ROUTE = '/Itineraries';
export const ROUTE_UPDATE_ITINERARY = '/update-itinerary/:id'; // Define the route for updating itinerary

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Register />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '*',
        element: <Notfound />
      }
    ]
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login />
      },
      {
        path: REGISTER_ROUTE,
        element: <Register />
      }
    ]
  },
  {
    element: <StudentDashboardLayout />,
    children: [
      {
        path: STUDENT_DASHBOARD_ROUTE,
        element: <Iteneraries />
      },
      {
        path: '/IteneraryForm',
        element: <CreateItineraryForm />
      },
      // Add route for updating itinerary
      {
        path: ROUTE_UPDATE_ITINERARY,
        element: <UpdateItenerary />
      }
    ]
  }
]);

import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE } from '../router';
import { axiosClient } from '../api/axios';
import { useUserContext } from '../context/UserContext';
import StudentApi from '../services/Api/Student/StudentApi';
import { Button } from '../components/ui/button';

export default function StudentDashboardLayout() {
    const navigate = useNavigate();
    const [Itinerary, setItinerary] = useState([]);
    const { setUser, setAuthenticated, logout:ContextLogout,authenticated, user } = useUserContext();

    useEffect(() => {
        StudentApi.getUser().then(({ data }) => {
                setUser({ name: data.name, email: data.email });
                setAuthenticated(true);
                
            })
            .catch((reason) => {
                ContextLogout();
                navigate(LOGIN_ROUTE)
            });
    }, []);

   
    const logout = async ()=>{
        StudentApi.logout().then(()=>{
            ContextLogout();
            navigate(LOGIN_ROUTE)
        })}

    
    return <>
        <header>
            <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

                    <div className="text-indigo-500 md:order-1">

                        <img className="w-24" src="{{ asset('images/logos.png') }}" alt="" />
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">

                            <li className="md:px-4 md:py-2 text-[#EF4A81]">
                                <Link to={'/'}>Dashboard</Link>
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-[#ffb703]">  <Link to={STUDENT_DASHBOARD_ROUTE}>Iteneraries</Link></li>
                            <li className="md:px-4 md:py-2 hover:text-[#ffb703]"><Link to={'/users'}>Students</Link></li>
                            {/* <li className="md:px-4 md:py-2 hover:text-[#ffb703]"><a href="#">ADD a Course</a></li>
                            <li className="md:px-4 md:py-2 hover:text-[#ffb703]"><a href="{{ route('matieres') }}">ADD a Subject </a>
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-[#ffb703]"><a href="{{ route('cycles') }}">Manage Your Cycles</a>
                            </li> */}
                            {/* <li className="md:px-4 md:py-2 hover:text-[#EF4A81]">
                                <a href="#">Partenaire</a>

                                <ul className="absolute hidden bg-gray-100 w-fit divide-y rounded-lg z-10 mt-2 py-1 shadow-lg">
                                    <li><a href="#"
                                        className="block px-4 py-2 text-[#EF4A81] hover:bg-[#ffb703] hover:text-white">Become a
                                        Teacher</a></li>
                                    <li style={{ borderColor: '#000000' }}>
                                        <a href="#" className="block px-4 py-2 text-[#EF4A81] hover:bg-[#ffb703] hover:text-white">Become a Partner</a>
                                    </li>

                                </ul>

                            </li> */}

                        </ul>
                    </div>
                    <div className="order-2 md:order-3">



{/* 
                        
                        <div className="sm:fixed sm:top-[-11px] sm:right-0 p-6 text-right z-10">

                            <form method="POST" action="{{ route('logout') }}">


                                <button type="submit"
                                    className="px-4 py-2 bg-[#ffb703] hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </form>

                        </div> */}

                         <Link className="text-white mx-2 p-2 bg-[#000000] hover:bg-[#343434]  hover:border hover:border-[#ffffff] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={'/login'} >Log in </Link>




                        <Button onClick={logout} >Log out</Button>
 



                    </div>

                </div>

            </nav >
        </header >
       
        <main className="container mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Itinerary.map(itinerary => (
                    <div key={itinerary.id} className="bg-white shadow rounded-lg p-4">
                        <img src={`data:image/jpeg;base64,${itinerary.image}`} alt={itinerary.title} className="w-full h-32 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{itinerary.title}</h2>
                        <p className="text-sm text-gray-500 mb-2">{itinerary.duration} days</p>
                        {/* Add more details as needed */}
                        <Link to={`/itinerary/${itinerary.id}`} className="text-blue-500 hover:underline">View Details</Link>
                    </div>
                ))}
            </div>
        </main>
        <Outlet />
        <footer> Footer</footer>

    </>
}


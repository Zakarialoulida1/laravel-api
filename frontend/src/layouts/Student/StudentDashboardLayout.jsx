import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE } from '../../router';

import { useUserContext } from '../../context/UserContext';
import StudentApi from '../../services/Api/Student/StudentApi';
import { Button } from '../../components/ui/button';
import StudentDropDownMenu from './StudentDropDownMenu';




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
                                <Link to={STUDENT_DASHBOARD_ROUTE}>Dashboard</Link>
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-[#ffb703]">  <Link to={'/IteneraryForm'} >Create Itenerary</Link></li>
                          

                        </ul>
                    </div>
                    <div className="order-2 md:order-3">
                      <StudentDropDownMenu/>
                    </div>

                </div>

            </nav >
        </header >
       
       
        <Outlet className />
     

    </>
}


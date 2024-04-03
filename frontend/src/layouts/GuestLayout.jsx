import React, { useEffect } from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from '../router';
import { useUserContext } from '../context/UserContext';


export default function GuestLayout() {


    const navigate = useNavigate();
    const context =useUserContext();
    useEffect(() => {
        
        if (context.authenticated) {
            navigate(STUDENT_DASHBOARD_ROUTE)
        }

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
                                <Link to={'/'}>Dashboard</Link>
                               </li>
                               <li className="md:px-4 md:py-2 hover:text-[#ffb703]">  <Link to={STUDENT_DASHBOARD_ROUTE}>Iteneraries</Link></li>
                              <li className="md:px-4 md:py-2 hover:text-[#ffb703]"><Link to={'/users'}>Students</Link></li>
                    

                        </ul>
                    </div>
                    <div className="order-2 md:order-3">




                       

                        <Link className="text-white mx-2 p-2 bg-[#ffb703] hover:bg-[#ffb703]  hover:border hover:border-[#EF4A81] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={'/login'} >Log in </Link>




                        <Link className="text-white mx-2 p-2 bg-[#ffb703] hover:bg-[#ffb703]  hover:border hover:border-[#EF4A81] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={'/signup'} >Register</Link>




                    </div>

                </div>

            </nav >
        </header >
        <main className={'container'}>
            <Outlet  />
        </main>
        <footer> Footer</footer>

    </>
}


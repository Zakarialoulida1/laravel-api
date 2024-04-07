import React from 'react';
import {Link, Outlet} from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from '../router';


export default function Layout() {
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




                        @auth
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

                        </div>

                        <Link className="text-white mx-2 p-2 bg-[#ffb703] hover:bg-[#ffb703]  hover:border hover:border-[#EF4A81] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={'/login'} >Log in </Link>




                        <Link className="text-white mx-2 p-2 bg-[#ffb703] hover:bg-[#ffb703]  hover:border hover:border-[#EF4A81] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={'/signup'} >Register</Link>




                    </div>

                </div>

            </nav >
        </header >
        <main className={'container'}>
            <Outlet  />
        </main>
        

    </>
}


import React, { useState } from "react";


import "../index.css"
import { Link } from "react-router-dom";

export const Navbar = () => {

    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen)
    }

    const handleNavClick = () => {
        setNavOpen(false)
    }

    return (
        <div className="relative">
            <nav className=" hidden xl:flex xl:fixed fixed bg-blue-600 w-auto min-h-screen  items-center ">
                <ul className="">

                    <Link to="/">
                        <li
                            className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 hover:border-l-4 cursor-pointer">
                            <span className="material-symbols-outlined">
                                computer
                            </span>
                            Manage
                        </li>
                    </Link>

                    <Link to="/employees">
                        <li
                            className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 hover:border-l-4 cursor-pointer">
                            <span className="material-symbols-outlined">account_circle</span>
                            Employees
                        </li>
                    </Link>

                    <Link to="/countries">
                        <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer hover:border-l-4">
                            <span className="material-symbols-outlined">flag</span>
                            Country
                        </li>
                    </Link>

                    <Link to="/departments">
                        <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer hover:border-l-4">
                            <span className="material-symbols-outlined">work</span>
                            Department
                        </li>
                    </Link>

                    <Link to="/cities">
                        <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer hover:border-l-4">
                            <span className="material-symbols-outlined">apartment</span>
                            City
                        </li>
                    </Link>

                    <Link to="/states">
                        <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer hover:border-l-4">
                            <span className="material-symbols-outlined">location_away</span>
                            State
                        </li>
                    </Link>
                </ul>


                {/* <div className="hidden">
                <span onClick={toggleNav} class="material-symbols-outlined cursor-pointer">
                    {navOpen ? 'menu' : 'close'}
                </span>

                <div className={`${navOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <ul>
                        <li onClick={handleNavClick} className="">Manage</li>
                        <li onClick={handleNavClick} className="">Employees</li>
                        <li onClick={handleNavClick} className="">Country</li>
                        <li onClick={handleNavClick} className="">Department</li>
                        <li onClick={handleNavClick} className="">City</li>
                        <li onClick={handleNavClick} className="">State</li>
                    </ul>
                    
                </div>
            </div> */}

            </nav>

            <nav className="xl:hidden fixed bg-blue-600 w-full p-4 z-10">
                <div className="flex justify-between items-center">

                    <Link to="/" onClick={handleNavClick}>
                    <h1 className="text-white font-bold flex items-center gap-4"><span className="material-symbols-outlined">
                        groups
                    </span> Employee Managament</h1>
                    </Link>

                    <span onClick={toggleNav} className="material-symbols-outlined cursor-pointer text-white">
                        {navOpen ? 'close' : 'menu'}
                    </span>
                </div>

                <div className={`${navOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                    <ul className="mt-4 space-y-4">
                        <Link to="/" onClick={handleNavClick}>
                            <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer">
                                <span className="material-symbols-outlined">computer</span>
                                Manage
                            </li>
                        </Link>
                        <Link to="/employees" onClick={handleNavClick}>
                            <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer">
                                <span className="material-symbols-outlined">account_circle</span>
                                Employees
                            </li>
                        </Link>
                        <Link to="/countries" onClick={handleNavClick}>
                            <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer">
                                <span className="material-symbols-outlined">flag</span>
                                Country
                            </li>
                        </Link>
                        <Link to="/departments" onClick={handleNavClick}>
                            <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer">
                                <span className="material-symbols-outlined">work</span>
                                Department
                            </li>
                        </Link>
                        <Link to="/cities" onClick={handleNavClick}>
                            <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer">
                                <span className="material-symbols-outlined">apartment</span>
                                City
                            </li>
                        </Link>
                        <Link to="/states" onClick={handleNavClick}>
                            <li className="flex items-center gap-2 px-10 py-6 font-bold text-gray-200 hover:bg-blue-500 cursor-pointer">
                                <span className="material-symbols-outlined">location_away</span>
                                State
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>

        </div>
    );
};
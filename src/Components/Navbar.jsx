import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import Logo from "/src/assets/Logo.png"
import { PiSignIn } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import {motion} from "framer-motion";

// eslint-disable-next-line react/prop-types


// eslint-disable-next-line react/prop-types
function Navbar({ searchtext, setSearchtext }) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleOpen = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

    const logoutfunc = () => {
        localStorage.removeItem("authtoken");
        navigate("/Signin");
    }

    // eslint-disable-next-line no-unused-vars
    const [Cartview, setCartview] = useState(false);

    console.log(localStorage.getItem("Usermail"))

    return (
        <div className={"bg-transparent mt-3 md:mt-0"}>
            <div className="flex items-center bg-white p-2 justify-around lg:justify-evenly">
                <div>
                    <Link to="/" className="flex text-white items-center font-bold text-4xl">
                        <img src={Logo} alt="" className={"w-16 md:w-20 mr-2"}/>
                        <span
                            className="text-lg text-black md:flex items-center pr-3 hidden md:text-xl lg:text-2xl font-bold">FoodFleet</span>
                    </Link>
                </div>


                <div className="flex justify-between items-center space-x-2">


                    <div
                        className="mx-5 flex space-x-1.5 items-center bg-[#f5f6fa] rounded-full lg:w-[36rem] w-52 md:w-96 ">
                        <IoSearchOutline className={"text-xl ml-3 rounded-3xl"}/>
                        <input type="search" placeholder="Search FoodFleet"
                               className="bg-[#f5f6fa] h-12 p-3 w-full rounded-full placeholder-black focus:outline-none focus:border-none placeholder:text-gray-500 placeholder:text-sm md:w-full"
                               onChange={(e) => setSearchtext(e.target.value)}
                               value={searchtext}/>


                    </div>

                </div>
                <div className=" flex items-center font-semibold">

                    {(localStorage.getItem("authtoken")) ?
                            <div className={"flex items-center space-x-2.5"}>
                            <Link to="/" onClick={toggleOpen}
                                  className="text-black p-1 transition duration-200 ml-3 rounded-full text-4xl cursor-pointer"><FaUserCircle/></Link>
                                <p className={"text-sm font-normal hidden lg:block"}>{localStorage.getItem("Usermail")}</p>
                            </div>
                        :
                        <Link to="/Signin"
                              className="text-black hover:text-white transition duration-200 ml-3 p-3 rounded-full bg-orange-600"><PiSignIn/></Link>
                    }

                </div>
                <button className={"absolute top-20 right-48 md:right-48 md:top-24"}>

                    {isOpen ?
                        <>
                            <motion.div
                                initial={{ y: '-100px' }}
                                animate={{ y: '0px' }}
                                transition={{ duration: 0.5, type: "spring" }}


                                className={"shadow-lg absolute z-50"}>
                                <ul
                                    role="menu"
                                    data-popover="profile-menu"
                                    data-popover-placement="bottom"
                                    className="absolute z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                                >
                                    <button tabIndex="-1"
                                            role="menuitem"
                                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                    >
                                        <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                            {localStorage.getItem("Usermail")}
                                        </p>
                                    </button>
                                    <Link to={"/myorders"}>
                                        <button tabIndex="-1"
                                                role="menuitem"
                                                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-orange-600 hover:text-white duration-200"
                                        >
                                            <MdOutlineShoppingCart className={"h-4 w-4"}/>
                                            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                                Orders
                                            </p>
                                        </button>
                                    </Link>


                                    <button onClick={() => {
                                        logoutfunc();
                                        toggleOpen();


                                    }}
                                            tabIndex="-1"
                                            role="menuitem"
                                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-orange-600 hover:text-white duration-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                                            ></path>
                                        </svg>
                                        <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                            Sign Out
                                        </p>
                                    </button>


                                </ul>

                            </motion.div>

                        </> : ""}

                </button>
            </div>

        </div>
    );
}

export default Navbar;

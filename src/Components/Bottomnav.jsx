import img from "/src/assets/Logo.png"
import {BiSolidFoodMenu} from "react-icons/bi";
import {FaCartShopping} from "react-icons/fa6";
import {RiLoginBoxFill} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {MdOutlineShoppingCart} from "react-icons/md";
import {useState} from "react";
import {TbShoppingCartCheck} from "react-icons/tb";

function Bottomnav() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logoutfunc = () => {
        localStorage.removeItem("authtoken");
        navigate("/Signin");
    }

    const toggleOpen = () => setIsOpen(!isOpen);
    return (


        <div
            className="fixed z-50 w-96 md:w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 shadow-lg">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                <button data-tooltip-target="tooltip-home" type="button" onClick={()=>navigate("/")}
                        className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 group">
                    <svg
                        className="w-5 h-5 mb-1 md:w-7 md:h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                </button>

                <button data-tooltip-target="tooltip-wallet" type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group" onClick={()=>navigate("/myorders")}>
                    <TbShoppingCartCheck
                        className="w-5 h-5 mb-1 md:w-7 md:h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"/>
                </button>

                <div className="flex items-center justify-center">
                    <img src={img} className={"rounded-full w-14"} alt=""/>
                </div>
                <button data-tooltip-target="tooltip-settings" type="button" onClick={()=>{navigate("/cart")}}
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <FaCartShopping
                        className="w-5 h-5 mb-1 md:w-7 md:h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"/>
                </button>


                {localStorage.getItem("authtoken") ?
                    <>
                        <button data-tooltip-target="tooltip-profile" type="button" onClick={toggleOpen}
                                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group">
                            <svg
                                className="w-5 h-5 md:w-7 md:h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </button>
                    </>

                    :
                    <>
                        <button data-tooltip-target="tooltip-profile" type="button" onClick={() => {
                            navigate("Signin")
                        }}
                                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group">
                            <RiLoginBoxFill
                                className="w-5 h-5 md:w-7 md:h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"/>
                        </button>
                    </>


                }

                {isOpen ?

                    <>
                        <div className={"shadow-lg absolute z-50 bottom-56 left-48 md:left-96"}>
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

                                <button tabIndex="-1"
                                        role="menuitem"
                                        className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-orange-600 hover:text-white duration-200"
                                >
                                    <MdOutlineShoppingCart className={"h-4 w-4"}/>
                                    <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                        Orders
                                    </p>
                                </button>

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
                                        stroke-width="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                                        ></path>
                                    </svg>
                                    <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                        Sign Out
                                    </p>
                                </button>


                            </ul>
                        </div>
                    </>
                    :""

                }


            </div>
        </div>

    );
}

export default Bottomnav;
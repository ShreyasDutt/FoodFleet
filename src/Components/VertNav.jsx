import {Link, useNavigate} from "react-router-dom";
import {FaCartShopping} from "react-icons/fa6";
import {RiLoginBoxFill} from "react-icons/ri";

import {TbShoppingCartCheck} from "react-icons/tb";

function VertNav() {
    const navigate = useNavigate();


    return (
        <div  className="sticky top-0 h-screen flex flex-col items-center justify-between w-20 bg-white p-1.5 py-2">

            <div className={"flex flex-col w-16 h-screen items-center justify-center space-y-20"}>

                <button data-tooltip-target="tooltip-home" type="button" onClick={() => navigate("/")}
                        className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-white group">
                    <svg
                        className="w-5 h-5 mb-1 md:w-7 md:h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                </button>


                <button data-tooltip-target="tooltip-wallet" type="button" onClick={()=>{
                    navigate("/myorders")
                }}
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-white group">
                    <TbShoppingCartCheck
                        className="w-5 h-5 mb-1 md:w-7 md:h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"/>
                </button>


                {localStorage.getItem("authtoken") ?
                    <>
                        <button data-tooltip-target="tooltip-profile" type="button" title={localStorage.getItem("Usermail")}
                                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-white group">
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
                            navigate("/Signin")
                        }}
                                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-white group">
                            <RiLoginBoxFill
                                className="w-5 h-5 md:w-7 md:h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-orange-600"/>
                        </button>
                    </>


                }


            </div>

        </div>
    );
}

export default VertNav;
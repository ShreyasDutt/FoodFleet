import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import VertNav from "./VertNav.jsx";
import Bottomnav from "./Bottomnav.jsx";
import Footer from "./Footer.jsx";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

function MyOrders() {
    const [orderData, setOrderData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/myorders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: localStorage.getItem("Usermail"),
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data);
            setOrderData(data.orderData.order_data || []);
        } catch (err) {
            setError(err.message);
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formattedDate = (date) => new Date(date).toLocaleDateString();

    return (
        <>
            {localStorage.getItem("authtoken")?
            <>
                <Navbar />
                <div className="lg:flex">
                    <div className="hidden lg:block relative">
                        <VertNav/>
                    </div>
                    <div className={"lg:flex-col"}>


                        <div className={"items-center justify-center flex lg:block"}>
                            <p className={"font-bold text-4xl bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 inline-block text-transparent bg-clip-text pb-2"}>
                                Order History
                            </p>
                        </div>

                        <div className="lg:w-[50rem] xl:w-[90rem]">
                            <div className="min-h-screen mt-7">
                                {error ? (
                                    <div>
                                        <div className="min-h-screen mt-20 flex flex-col items-center">
                                            <p className={"text-center text-xl md:text-2xl font-semibold"}>

                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                It seems like you haven't ordered something yet!

                                            </p>
                                            <Link to={"/"}>
                                                <div className="flex justify-center items-center mt-7">

                                                    <div className="relative inline-flex  group">
                                                        <div
                                                            className="absolute transitiona-all duration-1000 opacity-85 -inset-px bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                                                        </div>
                                                        <a href="#" title="Get quote now"
                                                           className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-orange-600 font-pj rounded-xl focus:scale-105"
                                                           role="button">Order now
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    orderData.length > 0 ? (
                                        orderData.map((orderGroup, orderGroupIndex) => (

                                            <div key={orderGroupIndex} className='mb-4'>
                                                {orderGroup[0]?.Order_date &&
                                                    <h4></h4>}
                                                {orderGroup.slice(1).map((item) => (
                                                    <div className={"h-auto"} key={item.id}>
                                                        <motion.div
                                                            initial={{ y: '1000px' }}
                                                            animate={{ y: '0px' }}
                                                            transition={{ duration: 0.3, type: "spring" }}

                                                            className={"flex flex-col justify-center mt-4 border-2 p-3 rounded-2xl"}>
                                                            <div className={"flex mb-4 justify-between"}>
                                                                <p className={"font-semibold text-xl"}>{item.name}</p>
                                                            </div>
                                                            <div className={"flex"}>
                                                                <div>
                                                                    <img src={item.img}
                                                                         className={"w-28 rounded-2xl h-24"}
                                                                         alt={item.name}/>
                                                                </div>
                                                                <div className={"flex-col ml-4 items-center"}>
                                                                    <p>{item.quantity} x {item.name}</p>
                                                                    <p>${item.price}</p>
                                                                    <p>Order Date: {formattedDate(orderGroup[0].Order_date)}</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    ) : ""
                                )}
                            </div>
                        </div>
                    </div>


                </div>

                <div className="lg:hidden">
                    <Bottomnav/>
                </div>
                <Footer/>

            </>
:
                <>
                    <Navbar />
                    <div className="lg:flex">
                        <div className="hidden lg:block relative">
                            <VertNav/>
                        </div>
                        <div className={"lg:flex-col"}>

                            <div className="lg:w-[50rem] xl:w-[90rem]">
                                <div className="min-h-screen mt-20 flex flex-col items-center">
                                    <p className={"text-center text-xl md:text-2xl font-semibold"}>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        It seems like you haven't ordered something yet!

                                    </p>
                                    <Link to={"/"}>
                                    <div className="flex justify-center items-center mt-7">

                                        <div className="relative inline-flex  group">
                                            <div
                                                className="absolute transitiona-all duration-1000 opacity-85 -inset-px bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                                            </div>
                                            <a href="#" title="Get quote now"
                                               className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-orange-600 font-pj rounded-xl focus:scale-105"
                                               role="button">Order now
                                            </a>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="lg:hidden">
                        <Bottomnav/>
                    </div>
                    <Footer/>

                </>


            }

        </>
    );
}

export default MyOrders;

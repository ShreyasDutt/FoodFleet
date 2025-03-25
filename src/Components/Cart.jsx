import { useEffect, useState, useCallback } from 'react';
import { FaShoppingBag } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useCart, useDispatchCart } from "./ContextReducer.jsx";
import Bottomnav from "./Bottomnav.jsx";
import gif from "/src/assets/EmptyCart.gif";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);

    const navigate = useNavigate();

    const currentDate = new Date(Date.now());
    const formattedDate = currentDate.toLocaleDateString();

    const totalPrice = data.reduce((total, food) => total + (food.price * food.quantity), 0);

    const calculateDiscount = useCallback((total) => {
        if (discountCode === "Fleet40") {
            return total * 0.4;
        }
        return 0;
    }, [discountCode]);

    const handleDiscountCode = () => {
        if (discountCode === "Fleet40") {
            setIsDiscountApplied(true);
            setDiscount(calculateDiscount(totalPrice));
        }
    };

    useEffect(() => {
        if (isDiscountApplied) {
            setDiscount(calculateDiscount(totalPrice));
        }
    }, [calculateDiscount, data, totalPrice, isDiscountApplied]);


    if (data.length === 0) {
        return (
            <div className={"lg:flex"}>
                <div className={"lg:flex lg:flex-col my-3"}>
                    <div className={"flex items-center my-10 flex-col space-y-7"}>
                        <p className={"font-bold text-5xl bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 inline-block text-transparent bg-clip-text pb-2"}>
                            Cart is Empty
                        </p>
                        <img src={gif} className={"rounded-full hue-rotate-180 saturate-200"} alt="Empty Cart" />
                    </div>
                </div>
                <div className={"lg:hidden"}>
                    <Bottomnav />
                </div>
            </div>
        );
    }

    const handleCheckout = async () =>{
        if ((!localStorage.getItem("authtoken"))){
            navigate("/Signin")
        }
        let useremail = localStorage.getItem("Usermail");
        let response = await fetch(`http://localhost:3000/api/OrderData`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_data:data,
                email: useremail,
                order_date:new Date().toDateString()
            })

        })
        console.log("orders: ",response);
        if (response.status===200){
            dispatch({type: "DROP"})
        }
    }


    return (
        <>
            <motion.div
                initial={{ x: '1000px' }}
                animate={{ x: '0px' }}
                transition={{ duration: 0.5, type: "spring" }}

                className={"w-full lg:-my-3 xl:w-[27rem] overflow-x-hidden"}>
                <div className={"sticky top-20 my-4 p-7 mx-3 rounded-2xl border-2"}>
                    <div className={"flex space-x-3 items-center"}>
                        <FaShoppingBag className={"font-bold text-xl"} />
                        <p className={"font-semibold text-xl"}>Order Detail</p>
                    </div>

                    {data.map((item) => (
                        <motion.div
                            initial={{ y: '100px' }}
                            animate={{ y: '0px' }}
                            transition={{ duration: 0.5, type: "spring" }}

                            className={"h-auto"} key={item.id}>
                            <div className={"flex flex-col justify-center mt-4 border-2 p-3 rounded-2xl"}>
                                <div className={"flex mb-4 justify-between"}>
                                    <p className={"font-semibold text-xl"}>{item.name}</p>
                                    <button
                                        className={"flex justify-center text-3xl text-orange-600 hover:bg-orange-600 hover:text-white transition duration-200 rounded-full"}
                                        onClick={() => {
                                            dispatch({ type: 'REMOVE', id: item.id });
                                        }}>
                                        <IoIosClose />
                                    </button>
                                </div>

                                <div className={"flex"}>
                                    <div>
                                        <img src={item.img} className={"w-28 rounded-2xl h-24"} alt={item.name} />
                                    </div>
                                    <div className={"flex-col ml-4 items-center"}>
                                        <p>{item.quantity} x {item.name}</p>
                                        <p>{formattedDate}</p>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <p className={"pl-2 mt-2"}>Have a Coupon code?</p>
                    <div className={"flex mb-3 space-x-1"}>
                        <input
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-full focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="text"
                            onChange={(e) => setDiscountCode(e.target.value)}
                            value={discountCode}
                            disabled={isDiscountApplied}
                        />
                        <button
                            onClick={handleDiscountCode}
                            className={"bg-orange-600 p-3 rounded-3xl text-white hover:bg-white hover:text-black border-orange-600 border-2 transition duration-200 active:scale-105"}
                            disabled={isDiscountApplied}
                        >
                            Apply
                        </button>
                    </div>


                    <div className={"flex flex-col rounded-2xl border-2 p-4 mt-5 font-semibold"}>
                        <div className={"flex justify-between"}>
                            <p className={"text-gray-400"}>Item</p>
                            <p>{data.length}</p>
                        </div>
                        <div className={"flex justify-between"}>
                            <p className={"text-gray-400"}>Discount</p>
                            <p>${discount ? discount.toFixed(2) : "0.00"}</p>
                        </div>
                        <div className={"flex justify-between"}>
                            <p className={"text-gray-400"}>Shipping</p>
                            <p>Free</p>
                        </div>
                        <hr className={"mt-7"} />
                        <div className={"flex justify-between mt-7"}>
                            <p className={"text-gray-400"}>Total</p>
                            <p className={"text-orange-600"}>${(totalPrice - discount).toFixed(2)}</p>
                        </div>

                        <a className={"flex items-center justify-center mt-10"}>
                            <button onClick={handleCheckout}
                                className={"bg-orange-600 w-full p-3 rounded-3xl text-white hover:bg-white hover:text-black border-orange-600 border-2 transition duration-200 active:scale-105"}
                            >
                                Place Order
                            </button>
                        </a>
                    </div>
                </div>
                <div className={"lg:hidden mt-20"}>
                    <Bottomnav />
                </div>
            </motion.div>
        </>
    );
}

export default Cart;

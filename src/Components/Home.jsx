import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { MdFilterAltOff } from "react-icons/md";
import Navbar from "./Navbar.jsx";
import img from "/src/assets/Discountimg.png";
import Cart from "./Cart.jsx";
import { motion } from "framer-motion";
import Bottomnav from "./Bottomnav.jsx";
import Footer from "./Footer.jsx";
import VertNav from "./VertNav.jsx";

function Home() {
    const [foodCategory, setFoodCategory] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [CategorySelected, setCategorySelected] = useState("");
    const [SplitVal, setSplitVal] = useState("");
    const [searchtext, setSearchtext] = useState("");

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/foodData", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            response = await response.json();
            setFoodItem(response[0]);
            setFoodCategory(response[1]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const x = CategorySelected.split(" ");
        setSplitVal(x[1] || "");
    }, [CategorySelected]);

    const filteredItems = foodItem.filter(item => {
        const matchesCategory = SplitVal !== "" ? item.CategoryName === SplitVal : true;
        const matchesSearch = item.name.toLowerCase().includes(searchtext.toLowerCase()) ||
            item.description.toLowerCase().includes(searchtext.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handlecopy = () => {
        navigator.clipboard.writeText("Fleet40");
        alert("Copied to clipboard");
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className={"overflow-x-hidden"}>
            <Navbar searchtext={searchtext} setSearchtext={setSearchtext} />
            <div className={"lg:flex "}>

                <div className={"hidden lg:block relative"}>
                    <VertNav />
                </div >


                <div className={"lg:w-[50rem] xl:w-[90rem]"}>
                    <div className="min-h-screen">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="relative flex flex-col mx-3 my-1.5 bg-orange-600 p-4 rounded-xl overflow-hidden">
                            <div className="absolute inset-1 flex items-center">
                                <motion.img
                                    initial={{ x: '1000px' }}
                                    animate={{ x: '0px' }}
                                    transition={{ duration: 0.5, type: "spring" }}

                                    src={img} alt="" className="w-64 mt-[1.5rem] h-64 object-cover rounded-xl float-right ml-28 md:ml-96 relative left-24 md:w-[30rem] md:h-96 md:left-16 lg:left-20 lg:w-[38rem]" />
                            </div>
                            <div className="relative flex flex-col space-y-2.5 lg:space-y-4 z-10">
                                <p className="bg-white p-2 w-32 rounded-full font-semibold text-center md:w-48 md:text-2xl lg:text-xl lg:p-3">Limited time!</p>
                                <p className="font-thin text-2xl text-white md:text-4xl">Get Special Discount</p>
                                <p className="font-bold text-5xl text-white md:text-6xl">40%</p>
                                <div className="flex items-center space-x-2 md:space-x-2 mb-2">
                                    <p className="font-thin text-xl text-white md:text-xl">T&C applied | </p>
                                    <button onClick={handlecopy} className="bg-white py-1.5 font-semibold rounded-full px-7 border-white border-2 hover:bg-transparent hover:text-white transition duration-200 md:text-xl md:px-9 lg:px-12">Claim</button>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-7">
                            <div className="mx-2 overflow-x-auto flex space-x-2" id="categorycard">
                                <button
                                    className={`px-4 rounded w-12 flex-shrink-0 flex items-center justify-center text-lg font-bold p-2 text-black border border-orange-600 hover:bg-orange-600 hover:text-white transition duration-150 ${CategorySelected === "" ? "bg-orange-600 text-white" : ""}`}
                                    onClick={() => setCategorySelected("")}
                                >
                                    <p className={"text-2xl"}>
                                        <MdFilterAltOff />
                                    </p>
                                </button>
                                {foodCategory.length > 0 &&
                                    foodCategory.map((item) => (
                                        <button
                                            className={`px-4 rounded w-full flex items-center flex-col justify-center text-lg font-bold p-2 text-black border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition duration-150 ${CategorySelected === item.CategoryName ? "bg-orange-600 text-white" : ""}`}
                                            key={item._id}
                                            onClick={() => setCategorySelected(item.CategoryName)}
                                        >
                                            {item.CategoryName}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <motion.div
                            className={"flex flex-col md:grid md:grid-cols-2 2xl:grid 2xl:grid-cols-3 items-center justify-center"}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"


                        >
                            {filteredItems.map((item) => (
                                <motion.div key={item._id} variants={childVariants}>
                                    <Card id={item._id} img={item.img} name={item.name} desc={item.description} price={item.price} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 4, type: "spring" }}
                    className="hidden lg:block sticky top-2 self-start">
                    <Cart />
                </motion.div>
            </div>

            <div className={"lg:hidden"}>
                <Bottomnav />
            </div>
            <Footer />
        </div>
    );
}

export default Home;

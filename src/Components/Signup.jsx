import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Logo from "/src/assets/Logo.png";
import { motion } from "framer-motion";
import axios from "axios";
import {ToastContainer, toast, Bounce} from 'react-toastify';


function Signup() {
    const [visible, setVisible] = useState(false);
    const inputType = visible ? "text" : "password";
    const [icon, setIcon] = useState(<FaEye />);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");

    let navigate = useNavigate();

    const changeType = (event) => {
        event.preventDefault();
        setVisible(!visible);
        setIcon(visible ? <FaEye /> : <FaEyeSlash />);
    };
    const success = () => toast.success('QR Generated Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });


    const handleGetLocation = (event) => {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        if (response.status === 200) {
                            const address = response.data.display_name;
                            setLocation(address);
                        } else {
                            console.error("Error getting address: ", response.data.error_message);
                            alert("Error getting address.");
                        }
                    } catch (error) {
                        console.error("Error getting address: ", error);
                        alert("Error getting address.");
                    }
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Error getting location. Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                location,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (!json.message) {
            alert("Enter Valid Credentials");
        } else {

            navigate("/Signin");
        }
        console.log(name, email, password);
    };

    return (
        <>
            <Navbar />
            <div className="overflow-x-hidden">
                <form className="px-2" onSubmit={handleSubmit}>
                    <div
                        className="relative flex flex-col justify-center rounded-xl min-h-screen p-1 my-2"
                        style={{
                            backgroundImage: `url(https://media.istockphoto.com/id/1182393436/vector/fast-food-seamless-pattern-with-vector-line-icons-of-hamburger-pizza-hot-dog-beverage.jpg?s=612x612&w=0&k=20&c=jlj-n_CNsrd13tkHwC7MVo0cGUyyc8YP6wJQdCvMUGw=)`,
                        }}
                    >
                        <motion.div
                            initial={{ x: "1000px" }}
                            animate={{ x: "0px" }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl shadow-black shadow-2xl"
                        >
                            <h1 className="text-3xl text-center text-orange-600 font-bold uppercase flex items-center justify-center">
                                <span className="text-3xl flex items-center pr-3">FoodFleet</span>
                                <img src={Logo} width={"60px"} alt="" />
                            </h1>
                            <div className="mt-6">
                                <div className="mb-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        pattern=".{5,}"
                                        title="Name must be at least 5 characters long"
                                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={email.toLowerCase()}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2 relative">
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-800">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                    <button
                                        onClick={handleGetLocation}
                                        className="absolute right-0 top-[1.80rem] p-3 text-orange-600 rounded-md"
                                    >
                                        <FaLocationDot />
                                    </button>
                                </div>
                                <div className="mb-2 relative">
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                                        Password
                                    </label>
                                    <input
                                        type={inputType}
                                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        pattern=".{6,}"
                                        title="Password must be at least 6 characters long"
                                        required
                                    />
                                    <button
                                        onClick={changeType}
                                        className="absolute right-0 top-[1.80rem] p-3 text-orange-600 rounded-md"
                                    >
                                        {icon}
                                    </button>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-600"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </div>
                            <p className="mt-8 text-xs text-center">
                                {" "}
                                Already have an account?{" "}
                                <Link to={"/Signin"} className="font-medium text-orange-600 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Signup;

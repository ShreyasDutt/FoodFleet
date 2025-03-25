import Logo from "/src/assets/Logo.png"
// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {motion} from "framer-motion";

function Signin() {

    const [visible, setVisible] = useState(false);
    const inputtype = visible ? "text" : "password";
    const [icon, setIcon] = useState(<FaEye/>);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeType = (event) => {
        event.preventDefault();
        setVisible(!visible);
        setIcon(visible ? <FaEye /> : <FaEyeSlash />);
    }

    let navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (!json.message) {
            alert("Enter Valid Credentials");
        } else {
            localStorage.setItem("Usermail",email);
            localStorage.setItem("authtoken",json.authtoken);
            navigate("/");
        }
        // console.log(email, password);
    };

    return (
        <>

        <Navbar/>
        <div>

            <form action="" className={"px-2 overflow-x-hidden"}>
                <div className="relative flex flex-col justify-center rounded-xl min-h-screen p-1 my-2" style={{backgroundImage: `url(https://media.istockphoto.com/id/1182393436/vector/fast-food-seamless-pattern-with-vector-line-icons-of-hamburger-pizza-hot-dog-beverage.jpg?s=612x612&w=0&k=20&c=jlj-n_CNsrd13tkHwC7MVo0cGUyyc8YP6wJQdCvMUGw=)`}}>
                    <motion.div

                        initial={{ x: '1000px' }}
                        animate={{ x: '0px' }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-full p-6 m-auto bg-white rounded-md  lg:max-w-xl shadow-black shadow-2xl">
                        <h1 className="text-3xl text-center text-orange-600 font-bold uppercase flex items-center justify-center">
                            <span className={'text-3xl flex items-center pr-3'}>FoodFleet</span>
                            <img src={Logo} width={"60px"} alt=""/>
                        </h1>
                        <div className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                    value={email.toLowerCase()}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-2 relative">
                                <label htmlFor="password"
                                       className="block text-sm font-semibold text-gray-800">Password</label>
                                <input type={inputtype}
                                       className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-orange-500 focus:ring-orange-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                       value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                />
                                <button onClick={changeType}
                                        className="absolute right-0 top-[1.80rem] p-3 text-orange-600 rounded-md">{icon}</button>
                            </div>
                            <div className="mt-6">
                                <button onClick={handlesubmit}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-600">
                                    Sign in
                                </button>
                            </div>
                        </div>

                        <p className="mt-8 text-xs  text-center">
                            {" "}
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Don't have an account?{" "}
                            <Link
                                to={"/Signup"}
                                className="font-medium text-orange-600 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </motion.div>
                </div>

            </form>
        </div>
            <Footer/>
        </>
    );
}

export default Signin;
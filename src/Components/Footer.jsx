import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaBowlFood } from 'react-icons/fa6';
import {Link} from "react-router-dom";
import img from "/src/assets/Logo.png"


function Footer() {
    return (
        <footer
            className="px-4 divide-y bg-white shadow-black shadow-xl">
            <div
                className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0"
            >
                <div className="lg:w-1/3 flex items-center justify-center">
                    <Link
                        rel="noopener noreferrer"
                        className="flex justify-center space-x-3 lg:justify-start"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full">
                            <p className={"text-3xl"}>
                                <img src={img} className={"w-full"} alt=""/>
                            </p>
                        </div>
                        <span className="self-center text-3xl font-bold">FoodFleet</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-gray-900">About us</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link rel="noopener noreferrer" >Features</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer">Integrations</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer" >Pricing</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer" >FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-gray-900">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link rel="noopener noreferrer">Privacy</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer" >Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-gray-900">Contact</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link rel="noopener noreferrer" >+123 456 789</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer" >FoodFleet@support</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer">Chandigarh, India</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase dark:text-gray-900">Social media</div>
                        <div className="flex justify-start space-x-3">
                            <Link rel="noopener noreferrer"
                                title="Whatsapp" className="flex items-center p-1">
                                <FaInstagram/>
                            </Link>
                            <Link rel="noopener noreferrer"
                                title="LinkedIN" className="flex items-center p-1">
                                <FaTwitter/>
                            </Link>
                            <Link rel="noopener noreferrer"
                               title="Instagram"
                               className="flex items-center p-1">
                                <FaFacebook/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-gray-600">
                © 2024 FoodFleet</div>
        </footer>
    );
}

export default Footer;
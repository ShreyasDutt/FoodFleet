import { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer.jsx";

function Card(props) {
    const [num, setNum] = useState(1);
    let dispatch = useDispatchCart();
    let data = useCart();

    const handlecart = async () => {
        await dispatch({
            type: 'ADD',
            id: props.id, name: props.name, price: Number(props.price), img: props.img, quantity: num
        });
    }

    return (
        <div className={"flex items-center justify-center h-auto"}>
            <div className={"border rounded-xl shadow-xl p-3 mx-3 flex flex-col w-full grid-rows-2 my-3 justify-center"}>
                <div className="relative">
                    <img className="h-64 w-full object-cover saturate-200 border rounded-xl"
                         src={props.img}
                         alt={props.img}/>
                </div>

                <div className={"flex flex-col items-center justify-center"}>
                    <div className={"flex flex-col w-full items-center justify-center"}>
                        <div className={"flex items-center"}>
                            <p className=" text-black p-2 font-bold text-center">{props.name}</p>
                        </div>
                        <p className={"text-center"}>{props.desc}</p>
                    </div>
                    <div className={"flex space-x-5"}>
                        <div className={"mt-4 bg-gray-200 p-5 rounded-full"}>
                            <p className={"font-bold text-2xl"}><span
                                className={"text-4xl text-orange-600 font-bold"}>$</span>{props.price}
                            </p>
                        </div>
                        <div className={"mt-7 flex items-center justify-center space-x-5"}>
                            <button className={"font-bold bg-gray-200 p-4 rounded-full"} onClick={() => {
                                setNum(prevNum => (prevNum > 1 ? prevNum - 1 : 1));
                            }}>-
                            </button>
                            <p className={"font-bold text-2xl"}>{num}</p>
                            <button className={"font-bold bg-gray-200 p-4 rounded-full"} onClick={() => {
                                setNum(num + 1);
                            }}>+
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center justify-center"}>
                    <button onClick={() => {
                        handlecart();
                        setNum(1);
                    }}
                            className={"mt-4 bg-orange-600 w-full text-white p-2 rounded-xl active:scale-90 transition duration-200"}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;

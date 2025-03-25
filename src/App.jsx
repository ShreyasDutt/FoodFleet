import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Signin from "./Components/Signin.jsx";
import {CartProvider} from "./Components/ContextReducer.jsx";
import Cart from "./Components/Cart.jsx";
import MyOrders from "./Components/MyOrders.jsx";

function App() {

  return (
    <>

        <CartProvider>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/Signin" element={<Signin/>} />
            <Route exact path="/Signup" element={<Signup/>} />
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/myorders" element={<MyOrders/>} />
        </Routes>

        </CartProvider>


    </>
  )
}

export default App

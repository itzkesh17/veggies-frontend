import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home.jsx"
import Register from './register-page/Register.jsx'
import AllProducts from "./Components/AllProducts/AllProducts.jsx"
import Cart from "./Components/CartPage/Cart.jsx"
import { ToastContainer } from "react-toastify"
import Checkout from "./Components/Checkout/Checkout.jsx"
import './app.scss'
import PageNotFound from "./Not Found Page/PageNotFound.jsx"
import AdminPage from "./Admin page/AdminPage.jsx"

function App() {

  return (

    <>
    <ToastContainer position="top-center" className='toast'/>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<AllProducts/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>
    </>
    
  )

}

export default App

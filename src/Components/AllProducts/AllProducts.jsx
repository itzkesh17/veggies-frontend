import Products from '@/Components/Products/Products.jsx'
import { useState } from 'react'
import './AllProductsCss.scss'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti";

const AllProducts = () => {

  const [searchProduct, setSearchProduct] = useState('')

  const navigate = useNavigate()

  const backToHome = () => {
    navigate('/')
  }

  return (
    <div className="all-products-page">
      <div className="mid-content" >
        <input 
        type="search" 
        name="search-products" 
        id="search" 
        placeholder='Search Products'
        value={searchProduct}
        onChange={(e)=> setSearchProduct(e.target.value)}
        />
      </div>
        <div className="pro-content">
          <div className="product-head">
            <h1>All Products</h1>
            <span 
            style={
              { fontSize:'1.3rem',
                padding:'.2rem .3rem',
                borderRadius:'1rem',
                boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                cursor:'pointer'}}
                onClick={backToHome}   
                >
                <TiArrowBack />
            </span>
          </div>
          <hr className='pro-line'/>
          <Products showAll searchedProduct={searchProduct}/>
        </div>
        <div className="foot-pro" >
            <Footer/>
        </div>
    </div>
  )
}

export default AllProducts
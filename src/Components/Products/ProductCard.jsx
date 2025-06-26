import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import './productCard.scss';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCard = ({ id, image, title, price }) => {
  const { addToCart } = useContext(CartContext);
  

   

  const handleAddToCart = () => {
    console.log("details", { id, image, title, price });
    
    addToCart({ id, image, title, price });
    toast.success(`${title} added to cart!`, {transition: Zoom})
  };

  return (
    <div className="product-card">
      <img src={image} alt="new image" className="product-img" />
      <h4 className="product-title">{title}</h4>
      <p className="product-desc">Fresh veggies daily, straight from farm to table.</p>
      <p className="product-price">₹{price}</p>
      <button className="product-button" onClick={handleAddToCart}>
        Add to cart
      </button>   
    </div>
    
  );
};

export default ProductCard;

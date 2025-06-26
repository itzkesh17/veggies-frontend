import { useState, useContext, useRef, useEffect } from 'react';
import './navbarCss.scss';
import { FaShoppingBag } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import { toast , Zoom} from 'react-toastify';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { user, logOut } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      <div className='whole-cont'>
        
        <div className="left-cont">
          <h1>VegeaoN</h1>
        </div>

        
        <div className="mid-cont">
          <nav className={isOpen ? 'nav-active' : ''}>
            <ul>
              <li><a href="#products">Products</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#subscribers">Subscribers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>

        
        <div className="right-cont">
          
          <div className="toggle-icon" onClick={toggleMenu}>
            {isOpen ? <ImCross className='cross-icon' /> : <TbMenuDeep className="menu-icon" />}
          </div>

          
          <div className="cart-cont" onClick={() => 
            {
              if (!user) {
                toast.error(`Please log in to view your cart`, { transition: Zoom });

                setTimeout(() => {
                  navigate('/register');
                }, 4000);
                
              } else {
                navigate('/cart');
              }
            }
          }>
            <FaShoppingBag className='cart-icon' />
            <span>{totalCount}</span>
          </div>

          
          {user ? (
            <div className="profile-section" ref={dropdownRef}>
              <div
                className="profile-circle"
                onClick={() => setShowDropdown(prev => !prev)}
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div
                  className="dropdown-menu"
                  onClick={() => {
                    logOut();
                    navigate('/register');
                  }}
                >
                  <button>Logout</button>
                  <BiLogOut className='logout-icon' />
                </div>
              )}
            </div>
          ) : (
            <IoPersonSharp className='login-icon' onClick={() => navigate('/register')} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useContext, useState } from 'react';
import './RegisterCss.scss';
import { POST_API, GET_API } from './API';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Components/Context/UserContext';
import { CartContext } from '../Components/Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const { setUser } = useContext(UserContext);
  const { setCartItems } = useContext(CartContext);

  const navigate = useNavigate(); 
  const ADMIN_EMAIL = 'admin17@gmail.com';
  const ADMIN_PASS = 'Admin@1718';

  function validateForm() {
    const newErr = {};
    const nameCondition = /^[a-zA-Z\s]+$/;
    const emailCondition = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!isLogin) {
      if (formInput.name.trim() === '') {
        newErr.name = 'Name is required';
      } else if (!nameCondition.test(formInput.name)) {
        newErr.name = "Name shouldn't contain special chars or numbs";
      }
    }

    if (formInput.email.trim() === '') {
      newErr.email = 'Email is required';
    } else if (!emailCondition.test(formInput.email)) {
      newErr.email = 'Enter a valid email';
    }

    if (formInput.password.trim() === '') {
      newErr.password = 'Password is required';
    } else if (!passwordCondition.test(formInput.password)) {
      newErr.password = 'Password should contain all the chars';
    }

    setError(newErr);
    setTimeout(() => setError({}), 5000);

    return Object.keys(newErr).length === 0;
  }

  async function updateForm(e) {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    if (isLogin) {
      const response = await axios.get(GET_API);
      const users = response.data.data;

      const matchedUser = users.find(
        (user) =>
          user.email === formInput.email &&
          user.password === formInput.password
      );

      if (matchedUser) {
        setUser(matchedUser);

        
        if (
          matchedUser.email === ADMIN_EMAIL &&
          matchedUser.password === ADMIN_PASS
        ) {
          toast.success(`Welcome Admin!`, { transition: Zoom });
          setTimeout(() => {
            navigate('/admin');
          }, 2000);
        } else {
          const savedCart = localStorage.getItem(
            `cart_items_${matchedUser.email}`
          );
          setCartItems(savedCart ? JSON.parse(savedCart) : []);

          toast.success(`Welcome back, ${matchedUser.username}!`, {
            transition: Zoom,
          });
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } else {
        toast.error("You haven't signed up yet!", { transition: Zoom });
      }
    } else {
      const response = await axios.post(POST_API, {
        username: formInput.name,
        email: formInput.email,
        password: formInput.password,
      });

      toast.success('We got your details. Login now!', { transition: Zoom });
      setIsLogin(true);
    }

    setFormInput({ name: '', email: '', password: '' });
  } catch (error) {
    console.log('Error:', error);
    toast.error('Something went wrong');
  }
}


  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormInput({ name: '', email: '', password: '' });
    setError({});
  };

  return (
    <div className='container'>
      <div className="child-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={updateForm}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="username"
                value={formInput.name}
                onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
              />
              <span>{error.name}</span>
            </>
          )}

          <input
            type="text"
            placeholder="email"
            value={formInput.email}
            onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
          />
          <span>{error.email}</span>

          <input
            type="password"
            placeholder="password"
            value={formInput.password}
            onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
          />
          <span>{error.password}</span>

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={toggleMode}>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { createContext, useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); 

  
  useEffect(() => {
    if (user && user.email) {
      const storedCart = localStorage.getItem(`cart_${user.email}`);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
      setIsInitialized(true); 
    }
  }, [user]);

  
  useEffect(() => {
    if (user && user.email && isInitialized) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user, isInitialized]);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increment = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, increment, decrement, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

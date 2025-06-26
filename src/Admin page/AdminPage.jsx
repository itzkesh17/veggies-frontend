import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoPersonSharp } from "react-icons/io5";
import './adminpageCss.scss';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [filterMethod, setFilterMethod] = useState('');
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();
  const ADMIN_URL = 'https://veggies-backend.onrender.com/admin';

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(`${ADMIN_URL}/getAdminOrders`);
      setOrders(res.data.data);

    } catch (err) {
      console.error("Error fetching orders:", err);
    }

  };

  const fetchStats = async() => {

    try {

      const res = await axios.get(`${ADMIN_URL}/adminStats`);
      setStats(res.data);

    } catch (error) {
      console.error("Error while fetching admin Stats: ", error);
    }

  }

  

    const deleteOrder = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        try {
          
          Swal.fire({
            title: 'Deleting...',
            text: 'Please wait',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          await axios.delete(`${ADMIN_URL}/deleteAdminOrders/${id}`);
          setOrders((prev) => prev.filter((order) => order._id !== id));
          fetchStats();

          
          Swal.fire({
            title: 'Deleted!',
            text: 'The order has been successfully deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });

        } catch (err) {
          console.error("Error deleting order:", err);

          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      }
    };


  const filterOrders = async (method) => {

    setFilterMethod(method);

    if (!method) {

      fetchOrders();
    } else {

      try {
        const res = await axios.get(`${ADMIN_URL}/filterAdminOrders/${method}`);
        setOrders(res.data.data);

      } catch (err) {
        console.error("Error filtering orders:", err);
      }
    }

  };

  return (
    <div className="admin-container">

        <div className="admin-head">
            <h2>🛒 Admin Order Dashboard</h2>

            <select value={filterMethod} onChange={(e) => filterOrders(e.target.value)}>
                <option value="">Payment Methods</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="cod">Cash on Delivery</option>
            </select>
        </div>
      
      <hr className='admin-line'/>


        {stats && (
        <div className="stats-card">
            <h3>{stats.totalOrders} <span>📦 Total Orders</span>  </h3>
            <h3>₹{stats.totalRevenue} <span>💰 Total Revenue</span></h3>
          <div className="payment-methods">
            
          {Object.entries(stats.paymentDistribution).map(([method, percentage]) => (
            <h5 key={method}>{method.toUpperCase()}: {percentage}%</h5>
          ))}

             <h4>📈 Profit Margin</h4>
          </div>
        </div>
        )}

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h4>{order.deliveryInfo.name}'s details!</h4>
            <p><strong>Name:</strong> {order.deliveryInfo.name}</p>
            <p><strong>Email:</strong> {order.deliveryInfo.email}</p>
            <p><strong>Phone:</strong> {order.deliveryInfo.phone}</p>
            <p><strong>Address:</strong> {order.deliveryInfo.address}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <button onClick={() => deleteOrder(order._id)}>🗑 Delete Order</button>
          </div>
        ))}
      </div>

      <button onClick={()=> navigate('/register')} className='go-home'>
        <IoPersonSharp />
      </button>

    </div>
  );
};

export default AdminPage;

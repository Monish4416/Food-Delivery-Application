import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading

    const fetchOrders = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            {loading ? (
                <div className="loader-container">
                    <div className="big-loader"></div>
                </div>
            ) : (
                <div className="container">
                    {data.length > 0 ? (
                        data.map((order, index) => (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>
                                    {order.items.map((item, idx) =>
                                        idx === order.items.length - 1
                                            ? `${item.name} x ${item.quantity}`
                                            : `${item.name} x ${item.quantity}, `
                                    )}
                                </p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p>
                                    <span>&#x25cf;</span> <b>{order.status}</b>
                                </p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;

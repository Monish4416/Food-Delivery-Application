import React, { useContext, useState } from 'react';
import "./LoginPopup.css";
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const { url, setToken } = useContext(StoreContext);
    const [loading, setLoading] = useState(false); // State to track loading
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHanlder = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({
            ...data, [name]: value
        }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response?.data?.token);
                localStorage.setItem("token", response?.data?.token);
                setShowLogin(false);
                toast.success("Login Successfully....");
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <input
                            name='name'
                            onChange={onChangeHanlder}
                            value={data.name}
                            type="text"
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHanlder}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHanlder}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? (
                        <div className="spinner"></div> // Spinner displayed here
                    ) : (
                        currState === "Sign Up" ? "Create account" : "Login"
                    )}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?{' '}
                        <span onClick={() => setCurrState("Sign Up")}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setCurrState("Login")}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;

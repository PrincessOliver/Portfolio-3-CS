import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!user.username || !user.password) {
            toast.error('Username and password are required.');
            return;
        }

        try {
            setIsLoading(true);

            const res = await fetch('http://localhost:5001/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const json = await res.json();

            if (res.ok) {
                navigate('/login');
                toast.success('Signup successful');
            } else {
                const errorMessage = json.message || 'Signup failed';
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('Error, try again later');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <ToastContainer />
            <form className="signup-login-form container-fluid">
                <div className="form-group">
                    <label>Username</label>
                    <input onChange={handleChange} name="username" type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handleChange} name="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button onClick={handleSignup} type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'SIGNUP'}
                </button>
            </form>
        </>
    );
};

export default Signup;

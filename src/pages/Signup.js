import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) navigate('/')
    }, [])

    const minLength = 6;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!user.username || !user.password) {
            toast.error('Username and password are required');
            return;
        }

        if (user.password.length < minLength) {
            toast.error(`Password must be at least ${minLength} characters`);
            return;
        }

        try {
            setIsLoading(true);

            const checkUsernameRes = await fetch(`http://localhost:5001/api/user/${user.username}`);
            const checkUsernameJson = await checkUsernameRes.json();

            if (checkUsernameRes.ok && checkUsernameJson) {
                toast.error('Username is already in use, please choose another username');
                return;
            }

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

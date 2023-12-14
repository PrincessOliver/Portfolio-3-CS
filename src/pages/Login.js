import { useNavigate } from "react-router-dom";
import { NavBar } from '../components/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/movies')
        }
    }, [navigate]);

    const minLength = 6;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
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

            const res = await fetch('http://localhost:5001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const json = await res.json();

            if (res.ok) {
                localStorage.setItem('userId', json.id);
                localStorage.setItem('userName', json.userName);
                localStorage.setItem('token', json.token);
                navigate('/movies');
                toast.success('Login Successfully');
            } else {
                const errorMessage = json.message || 'Invalid username or password';
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Login failed', error);
            toast.error('Login failed try later');
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
                <button
                    onClick={handleLogin}
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'LOGIN'}
                </button>
            </form>
        </>
    );
}

export default Login;

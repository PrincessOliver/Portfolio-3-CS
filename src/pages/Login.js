import { useNavigate } from "react-router-dom";
import { NavBar } from '../components/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/movies')
        }
    })
    
    let user = { username: null, password: null }

    const handleChange = ({ target: { name, value } }) => {
        user = {
            ...user,
            [name]: value
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:5001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const json = await res.json()

        if (res.ok) {
            localStorage.setItem('userId', json.id)
            localStorage.setItem('userName', json.userName)
            localStorage.setItem('token', json.token)
            navigate("/movies")
        }
    }
    

    return (
        <>
            <NavBar />
            <ToastContainer />
            <form className="signup-login-form container-fluid">
                <div className="form-group">
                    <label>Username</label>
                    <input onChange={(e) => handleChange(e)} name="username" type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => handleChange(e)} name="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button onClick={(e) => handleLogin(e)} type="submit" className="btn btn-primary">LOGIN</button>
            </form>
        </>
    );
}

export default Login;

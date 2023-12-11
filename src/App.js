//import logo from './logo.svg';
import './App.css';
// import { useEffect, useState } from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import logo from './IMDBClone.png';
// import ProfileIcon from './ProfileIcon.png';
// import Dropdown from 'react-bootstrap/Dropdown';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Homepage } from './pages/Homepage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Bookmarks} from './pages/Bookmarks';

function App() {
    return(
        <>          
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={ <Homepage /> } />
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                </Routes>
            </Router>
        </>
  );
}

export default App;

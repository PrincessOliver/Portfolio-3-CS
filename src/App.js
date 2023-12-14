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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Bookmarks} from './pages/Bookmarks';
import { Series } from './pages/Series';
import { Homepage } from './pages/Movies';
import { Title } from './pages/Title';
import { RatingHistory } from './pages/RatingHistory';

import GenrePage from './pages/GenrePage';

function App() {    
    return(
        <>          
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={ <Homepage /> } />
                    <Route path="/series" element={ <Series /> } />
                    <Route path="/title" element={ <Title /> } />
                    <Route path='titles/:genre' element={<GenrePage />} />
                    <Route path="/rating-history" element={ <RatingHistory /> } />
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                </Routes>
            </Router>
        </>
  );
}

export default App;

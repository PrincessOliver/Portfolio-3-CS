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
    Link,
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
import { Movie } from './pages/Movie';
import { RatingHistory } from './pages/RatingHistory';



import "./App.css";
import Home from "./pages/test2";
import Products from "./pages/test1";
import Logins from "./pages/test3";
import Search from "./pages/test4";

function App() {
    
    return(
        <>       
            <Router>
      <nav>
        <Link to="/home"> Home </Link>
        <Link to="logins"> Login </Link>
        <Link to="products/search"> Products </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="logins" element={<Logins />} />
        <Route path="products" element={<Products />}>
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </Router>   
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={ <Homepage /> } />
                    <Route path="/series" element={ <Series /> } />
                    <Route path="/movie" element={ <Movie /> } />
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

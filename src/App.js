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
import {Bookmarks} from './pages/Bookmarks';
import { Series } from './pages/Series';
import { Movies } from './pages/Movies';
import { Title } from './pages/Title';
import { RatingHistory } from './pages/RatingHistory';
import { Media } from './pages/Media';

import GenrePage from './pages/GenrePage';
import { NavBar } from './components/NavBar';
import { SearchHistory } from './pages/SearchHistory';

function App() {
    return(
        <>        
            <NavBar />
            <Router>
                <Routes>
                    <Route path="/" element ={<Media/>}>
                      <Route path="/" element={ <Movies /> } />
                      <Route path="title/:id" element={ <Title /> } />
                      <Route path="series" element={ <Series /> } />
                      <Route path='titles/:genre' element={<GenrePage />} />
                    </Route>
                    <Route path="/person/:id" element={ <SearchHistory /> } />
                    <Route path="/search-history" element={ <SearchHistory /> } />
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

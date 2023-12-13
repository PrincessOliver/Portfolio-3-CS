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
import logo from './IMDBClone.png';
import Signup from './pages/Signup';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Bookmarks} from './pages/Bookmarks';
import { Series } from './pages/Series';
import { Movies } from './pages/Movies';
import { Movie } from './pages/Movie';
import { RatingHistory } from './pages/RatingHistory';
import { Media } from './pages/Media';

function App() {
  const loggedIn = localStorage.getItem('token') !== null
  const userName = localStorage.getItem('userName')

console.log("x")

  const genres = [
    'Action',
    'Adventure',
    'Adult',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Game-Show',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Short',
    'Sport',
    'Talk-Show',
    'Thriller',
    'War',
    'Western',
    'Other'
]
    return(
        <>        
      
            <ToastContainer />
            <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a href="/">
            <img src={logo} className="img1" alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

                
            </form>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <a className="nav-link" ><Link to = "/movies"> Movies </Link> <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">  <Link to = "/Series"> Series </Link></a>
                    </li>
                    <li className="nav-item dropdown dropdown-genres">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Genres
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {genres.map(genre => {
                                return <a key={genre} className="dropdown-item" href={genre}>{genre}</a>;
                            })}
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link Actors" href="/#">Actors</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link Bookmark" href="/bookmarks">Bookmarks</a>                    
                    </li>

                    <li className="nav-item">
                        <a className="nav-link Game" href="/#"> Game</a>

                    </li>

                    <div className='nav-right'>
                    {loggedIn ? <> <div className='username'> {userName} </div>
                            <button className='nav-item dropdown profile-btn'>
                                <i className="bi bi-person-fill dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/bookmarks">Bookmarks</a>
                                    <a className="dropdown-item dropdown dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">History</a>
                                    <div className="dropdown-menu dropdown-menu-history" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="/rating-history">Rating</a>
                                        <a className="dropdown-item" href="/#">Search</a>
                                    </div>
                                    <a onClick={() => localStorage.clear()} className="dropdown-item" href="/movies">Logout</a>
                                </div>
                            </button>
                            </>
                    :
                    <div className='login-signup-btns'>
                        <a className="nav-link Login" href="/login">Login</a>
                        <a className="nav-link SignUp" href="/signup">SignUp</a>
                    </div>
                    }  
                    </div>
                    
                    
                    
                    {/* <img src={ProfileIcon} className="img2" alt='profile' /> */}

                </ul>
                
            </div>
        </nav>
                <Routes>
                    <Route path="/" element ={<Media/>}>
                      <Route path="movies" element={ <Movies /> } />
                      <Route path="movie" element={ <Movie /> } />
                      <Route path="series" element={ <Series /> } />
                    </Route>
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

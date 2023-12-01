//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './IMDBClone.png';
import ProfileIcon from './ProfileIcon.png';

function App() {

    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <img src={logo} class="img1" />
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

                
            </form>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Movies <span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Series</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Genres
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link Actors" href="#">Actors</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link Bookmark" href="#">Bookmarks</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link Game" href="#"> Game</a>

                    </li>
                    <ul>
                    <li class="Login">
                        <a class="nav-link Login"href="#"> Login</a>
                    
                        </li>
                   
                    <li class="SignUp">
                       
                        <a class="nav-link SignUp" href="#"> SignUp</a>

                        </li>
                    </ul>
                    
                    

                    <img src={ProfileIcon} class="img2" />

                  

                </ul>
                
            </div>
        </nav>
  );
}

export default App;

import React from 'react';
import logo from '../IMDBClone.png';
// import ProfileIcon from '../ProfileIcon.png';
import '../App.css';

export const NavBar = () => {
    const loggedIn = localStorage.getItem('token') !== null

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

    return (
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
                        <a className="nav-link" href="/">Movies <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#">Series</a>
                    </li>
                    <li className="nav-item dropdown dropdown-genres">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Genres
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {genres.map(genre => {
                                return <a key={genre} className="dropdown-item" href="/#">{genre}</a>;
                            })}
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link Actors" href="/#">Actors</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link Bookmark" href="/#">Bookmarks</a>
                    </li> */}

                    <li className="nav-item">
                        <a className="nav-link Game" href="/#"> Game</a>

                    </li>

                    <div className='nav-right'>
                    {loggedIn ? <button className='nav-item dropdown profile-btn'>
                                <i className="bi bi-person-fill dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/bookmarks">Bookmarks</a>
                                    <a className="dropdown-item dropdown dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">History</a>
                                    <div className="dropdown-menu dropdown-menu-history" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="/rating-history">Rating</a>
                                        <a className="dropdown-item" href="/#">Search</a>
                                    </div>
                                    <a onClick={() => localStorage.clear()} className="dropdown-item" href="/">Logout</a>
                                </div>
                            </button>
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
    )
}
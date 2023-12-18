import React, { useState, useEffect, useRef } from 'react';
import logo from '../IMDBClone.png';
// import ProfileIcon from '../ProfileIcon.png';
import '../App.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Genres } from './Genres';

export const NavBar = () => {
    const navigate = useNavigate()
    const [ searchVal, setSearchVal ] = useState(null)
    const [ searchRes, setSearchRes ] = useState(null)
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ searchShown, setSearchShown ] = useState(false)
    const location = useLocation()
    const [ firstRender, setFirstRender ] = useState(true)
    const searchResultsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setSearchShown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchResultsRef]);

    useEffect(() => {
        if (firstRender) {
            if (localStorage.getItem('token') !== null) {
                setLoggedIn(true)
                setFirstRender(false)
            }
        }
    }, [location])

    useEffect(() => {
        try {
            const endpoint = loggedIn ? `http://localhost:5001/api/titles/search-loggedin/${localStorage.getItem('userId')}/${searchVal}`
                : `http://localhost:5001/api/titles/search/${searchVal}`
            let delay
            if (searchVal) {
                setSearchShown(true)
                delay = setTimeout(async () => {
                    let res = await fetch(endpoint)
                    let json = await res.json()
                    setSearchRes(json)
                }, 1000)
            }
            
            return () => {
                clearTimeout(delay)
                setSearchRes(null)
            }
        } 
        catch (err) {
            console.log(err)
        }
    }, [searchVal])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
            <img src={logo} className="img1" alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div>
                <form className="form-inline my-2 my-lg-0">
                    <input onFocus={() => setSearchShown(true)} onChange={(e) => setSearchVal(e.target.value)}className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                {searchVal && searchShown ? 
                    <div ref={searchResultsRef} className='search-results'>
                        {!searchRes && <span className='loader center'></span>}
                        {searchRes && searchRes.length > 0 && searchRes.map((item, index) => {
                            return <div
                                onClick={() => {
                                    if (item.id.slice(0, 2) === 'tt') navigate(`title/${item.id}`)
                                    else navigate(`person/${item.id}`)
                                    setSearchShown(false)
                                }}
                                className='search-result'
                                key={index}
                            >
                                {item.searchString}
                            </div>
                        })}
                        {searchRes && searchRes.length === 0 && <div className='center'>no results</div>}
                    </div> 
                : null}
            </div>
            

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to="/">Movies <span className="sr-only"></span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/series"> Series</Link>
                    </li>
                    <Genres />
                    {/* <li className="nav-item">
                        <a className="nav-link Game" href="/#"> Game</a>
                    </li> */}

                    <div className='nav-right'>
                    {loggedIn ? <> <div className='username'> {localStorage.getItem('userName')} </div>
                            <button className='nav-item dropdown profile-btn'>
                                <i className="bi bi-person-fill dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/bookmarks">Bookmarks</Link>
                                    <Link className="dropdown-item" to="/rating-history">Rating History</Link>
                                    <Link className="dropdown-item" to="/search-history">Search History</Link>
                                    <Link
                                        onClick={() => {
                                            localStorage.clear()
                                            setLoggedIn(false)
                                        }}
                                        className="dropdown-item" to="/"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </button>
                        </>
                    :
                    <div className='login-signup-btns'>
                        <Link className="nav-link Login" to="/login">Login</Link>
                        <Link className="nav-link SignUp" to="/signup">SignUp</Link>
                    </div>
                    }  
                    </div>
                    
                    
                    
                    {/* <img src={ProfileIcon} className="img2" alt='profile' /> */}

                </ul>
                
            </div>
        </nav>
    )
}

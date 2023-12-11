import { NavBar } from "../components/NavBar";
import React, { useEffect, useState } from 'react';

export const Bookmarks = () => {
    const[shownBookmarks,setShownBookmarks] = useState([]);
    const[id,setId] = useState(0);

    const loggedIn = localStorage.length > 0;

    useEffect(() => {
        getBookmarks('http://localhost:5001/api/bookmarks/13/');
    }, [id])

    const getBookmarks = async (endpoint) => {
        try{
            const res = await fetch(endpoint);
            const json = await res.json();

            if (json && Array.isArray(json)){
                setShownBookmarks(json);
        }else {
            console.error('API did not return an array of items',json);
        }
        } catch (error) {
            console.error('Error fecting bookmarks:', error);
        }
    };
    
    return (
        <>
            <NavBar loggedIn={loggedIn} />
            <div>
                
                <div className="container mt-4">
                    <h2>Bookmarks</h2>
                    <div className="row">
                        {shownBookmarks.map((bookmark, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">                                    
                                    <div className="card-body">
                                        <h5 className="card-bookmark">{bookmark.id}</h5>
                                        <h5 className="card-bookmark">{bookmark.bookmarkId}</h5>
                                        <h5 className="card-bookmark">{bookmark.titleId}</h5>
                                        <h5 className="card-bookmark">{bookmark.usernote}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
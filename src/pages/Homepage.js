import { NavBar } from "../components/NavBar";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
export const Homepage = () => {
    const [shownTitles, setShownTitles] = useState([]);

    const loggedIn = localStorage.length > 0;

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles/type/movie');
    }, []);

    const getTitles = async (endpoint) => {
        try {
            const res = await fetch(endpoint);
            const json = await res.json();

            if (json && Array.isArray(json.items)) {
                setShownTitles(json.items);
            } else {
                console.error('API did not return an array of items:', json);
            }
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };

    return (
        <>
            <NavBar loggedIn={loggedIn} />
            <div className="container mt-4">
                <h2>Movie Titles</h2>
                <div className="row">
                    {shownTitles.map((title, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={title.poster} alt={title.name} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{title.name}</h5>
                                    <p className="card-text">Rating: {title.weighAvgRating}/10</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

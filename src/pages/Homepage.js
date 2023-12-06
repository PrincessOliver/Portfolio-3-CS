import { NavBar } from "../components/NavBar";
import React, { useEffect, useState } from 'react';

export const Homepage = () => {
    const [shownTitles, setShownTitles] = useState([]);

    const loggedIn = localStorage.length > 0;

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles');
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
            <div>
                <h2>Movie Titles</h2>
                <ul>
                    {shownTitles.map((title) => (
                        <li key={title.id}>{title.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

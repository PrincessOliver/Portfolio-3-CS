import { NavBar } from "../components/NavBar";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import noPoster from '../Information_Missing_Mock_MC_Patch.jpg'; 
import {
    BrowserRouter as Router,
    Link,
    Routes,
    Route, 
    Outlet
} from "react-router-dom";

export const Movies = () => {
    const [shownTitles, setShownTitles] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles/movies');
    }, []);

    useEffect(() => {
        getTitles(`http://localhost:5001/api/titles/movies?page=${page}&pageSize=10`)
    }, [page])

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

    const addToBookmarks = async e => {
        try {
            e.stopPropagation()
            const res = await fetch('http://localhost:5001/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId'),
                    titleId: window.location.search.slice(1),
                    userNote: 'x'
                })
            })
            const json = await res.json()

            console.log(json)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <NavBar />
            <div>
                {page > 0 && <button onClick={() => { if (page > 0) { setPage(page -1) }}}>Prev</button>}
                <button onClick={() => setPage(page + 1)}>Next</button>
                <div className="container mt-4">
                    <h2>Movie Titles</h2>
                    <div className="row">
                        {shownTitles.map((title, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div 
                                    onClick={() => {
                                        localStorage.setItem('clickedTitle', title.poster)
                                        window.location = `movie?${title.url.split('/')[5]}`
                                    }}
                                    className="card"
                                >
                                    <img className="card-img-top" src={title.poster !=='N/A' ? title.poster : noPoster} alt="poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{title.name}</h5>
                                        <p className="card-text">{Math.round(title.weightAvgRating * 10) / 10}/10</p>
                                        <button onClick={(e) => addToBookmarks(e)}>ADD TO BOOKMARKS</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

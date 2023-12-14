import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import noPoster from '../Information_Missing_Mock_MC_Patch.jpg'; 

export const Movies = () => {
    const [shownTitles, setShownTitles] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles/movies');
    }, []);

    useEffect(() => {
        if (page > 0) getTitles(`http://localhost:5001/api/titles/movies?page=${page - 1}&pageSize=10`)
        console.log(page)
    }, [page])

    const getTitles = async (endpoint) => {
        try {
            const res = await fetch(endpoint);
            const json = await res.json();

            if (json && Array.isArray(json.items)) {
                setShownTitles(json);
            } else {
                console.error('API did not return an array of items:', json);
            }
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };

    return (
        <>
            <div>
                {[...Array(shownTitles.numberOfPages)].map((e, i) => <button className="page-btn" key={i}>{i + 1}</button>)}
                {/* {shownTitles.numberOfPages > 10
                    ? [...Array(10)].map((e, i) => <button onClick={() => setPage(i + 1)} className="page-btn" key={i}>{i + 1}</button>)
                    : [...Array(shownTitles.numberOfPages)].map((e, i) => <button className="page-btn" key={i}>{i + 1}</button>)
                } */}
                {/* {shownTitles.numberOfPages > 10 && <button className='page-btn'>next</button>}
                {page > 10 && <button className='page-btn'>prev</button>} */}
            </div>

            {/* {page > 0 && <button onClick={() => { if (page > 0) { setPage(page -1) }}}>Prev</button>}
            <button onClick={() => setPage(page + 1)}>Next</button> */}
            <div className="container mt-4">
                <h2>Movie Titles</h2>
                <div className="row">
                    {shownTitles.items?.map((title, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div 
                                onClick={() => {
                                    localStorage.setItem('clickedTitle', title.poster)
                                    window.location = `title?${title.url.split('/')[5]}`
                                }}
                                className="card"
                            >
                                <img className="card-img-top" src={title.poster !=='N/A' ? title.poster : noPoster} alt="poster" />
                                <div className="card-body">
                                    <h5 className="card-title">{title.name}</h5>
                                    <p className="card-text">{Math.round(title.weightAvgRating * 10) / 10}/10</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

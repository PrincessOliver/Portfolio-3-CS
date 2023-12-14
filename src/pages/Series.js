import React, { useEffect, useState } from 'react';

export const Series = () => {
    const [shownTitles, setShownTitles] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles/series');
    }, []);

    useEffect(() => {
        getTitles(`http://localhost:5001/api/titles/series?page=${page}&pageSize=10`)
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

    return (
        <>
            <div>
                {page > 0 && <button onClick={() => { if (page > 0) { setPage(page -1) }}}>Prev</button>}
                <button onClick={() => setPage(page + 1)}>Next</button>
                <div className="container mt-4">
                    <h2>Series Titles</h2>
                    <div className="row">
                        {shownTitles.map((title, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">
                                    <img className="card-img-top" src={title.poster} alt="poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{title.name}</h5>
                                        <p className="card-text">{Math.round(title.weightAvgRating * 10) / 10}/10</p>
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

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

export const Series = () => {
    const navigate = useNavigate()
    const [shownTitles, setShownTitles] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles/series');
    }, []);

    useEffect(() => {
        if (page > 0) getTitles(`http://localhost:5001/api/titles/series?page=${page - 1}&pageSize=10`)
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
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                // pageRangeDisplayed={5}
                previousLabel="previous"
                renderOnZeroPageCount={null}
                pageCount={shownTitles.numberOfPages}
                onPageChange={(e) => setPage(e.selected + 1)}
                marginPagesDisplayed={3}
                containerClassName='pagination'
                activeClassName='pagination-active'
            />
            <div className="container mt-4">
                <h2>Series Titles</h2>
                <div className="row">
                    {shownTitles.items?.map((title, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div 
                                onClick={() => navigate(`title/${title.id}`, { replace: true })}
                                className="card"
                            >
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
        </>
    );
};

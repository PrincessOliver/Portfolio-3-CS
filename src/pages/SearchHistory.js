import React, { useEffect, useState } from 'react';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';

export const SearchHistory = () => {
    const [shownSearchHistory, setShownSearchHistory] = useState([]);
    const [userId, setUserId] = useState(null);
    const [ modalShown, setModalShown ] = useState(false)
    const [ endpoint, setEndpoint ] = useState(null)
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        if (userId) {
            getSearchHistory(`http://localhost:5001/api/search-history/${userId}`);
        }
    }, [userId]);

    const getSearchHistory = async (endpoint) => {
        try {
            const res = await fetch(endpoint);
            const json = await res.json();

            if (json && Array.isArray(json)) {
                setShownSearchHistory(json);
            } else {
                console.error('API did not return an array of items', json);
            }
        } catch (error) {
            console.error('Error fetching search history', error);
        }
    };

    return (
        <>
            <ConfirmDeleteModal
                shown={modalShown}
                setShown={setModalShown}
                endpoint={endpoint}
                message={message}
                getData={() => getSearchHistory(`http://localhost:5001/api/search-history/${userId}`)}
            />
            <div>
                <div className="container mt-4">
                    <h2>Search History</h2>
                    <button
                        onClick={() => {
                            setModalShown(true)
                            setEndpoint(`http://localhost:5001/api/search-history/delete/${userId}`)
                            setMessage('All search history removed')
                        }}
                    >
                        Remove all
                    </button>
                    <div className="row">
                        {shownSearchHistory.map((history, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <p>Search Query: {history.searchQuery}</p>
                                        <p>Timestamp: {history.timeStamp}</p>
                                        <button
                                            onClick={() => {
                                                setModalShown(true)
                                                setEndpoint(`http://localhost:5001/api/search-history/delete/${userId}/${history.id}`)
                                                setMessage('Search history removed')
                                            }}
                                        >
                                            Remove
                                        </button>
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

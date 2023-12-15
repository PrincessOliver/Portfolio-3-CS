import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ConfirmModal } from '../components/ConfirmModal';

export const SearchHistory = () => {
    const [shownSearchHistory, setShownSearchHistory] = useState([]);
    const [userId, setUserId] = useState(null);
    const [modalShown, setModalShown] = useState(false);
    const [historyIdToDelete, setHistoryIdToDelete] = useState(null);
    const [request, setRequest] = useState(null);

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

    const removeSearchHistory = async () => {
        try {
            const res = await fetch(`http://localhost:5001/api/search-history/delete/${userId}/${historyIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();

            if (json) {
                toast.success('Search history removed');
                getSearchHistory(`http://localhost:5001/api/search-history/${userId}`);
                setModalShown(false);
            }
        } catch (err) {
            console.error('Error removing search history', err);
        }
    };

    const removeAllSearchHistory = async () => {
        try {
            const res = await fetch(`http://localhost:5001/api/search-history/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();

            if (json) {
                toast.success('All search history removed');
                getSearchHistory(`http://localhost:5001/api/search-history/${userId}`);
                setModalShown(false); 
            }
        } catch (err) {
            console.error('Error removing all search history', err);
        }
    };

    return (
        <>
            <ConfirmModal
                shown={modalShown}
                setShown={setModalShown}
                removeItem={removeSearchHistory}
                removeAllItems={removeAllSearchHistory}
                request={request}
            />
            <ToastContainer />
            <div>
                <div className="container mt-4">
                    <h2>Search History</h2>
                    <button
                        onClick={() => {
                            setModalShown(true);
                            setRequest('all');
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
                                                setModalShown(true);
                                                setHistoryIdToDelete(history.historyId);
                                                setRequest('one');
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

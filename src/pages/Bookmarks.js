import React, { useEffect, useState } from 'react';
import noPoster from '../Information_Missing_Mock_MC_Patch.jpg';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';

export const Bookmarks = () => {
    const [shownBookmarks, setShownBookmarks] = useState([]);
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
            getBookmarks(`http://localhost:5001/api/bookmarks/${userId}`);
        }
    }, [userId]);

    const getBookmarks = async (endpoint) => {
        try {
            const res = await fetch(endpoint);
            const json = await res.json();

            if (json && Array.isArray(json)) {
                setShownBookmarks(json);
            } else {
                console.error('API did not return an array of items', json);
            }
        } catch (error) {
            console.error('Error fetching bookmarks', error);
        }
    };

    return (
        <>
            <ConfirmDeleteModal
                shown={modalShown}
                setShown={setModalShown}
                endpoint={endpoint}
                message={message}
                getData={() => getBookmarks(`http://localhost:5001/api/bookmarks/${userId}`)}
            />
            <div>
                <div className="container mt-4">
                    <h2>Bookmarks</h2>
                    <button
                        onClick={() => {
                            setModalShown(true)
                            setEndpoint(`http://localhost:5001/api/bookmarks/${userId}`)
                            setMessage('All bookmarks removed')
                        }}
                    >
                        Remove all
                    </button>
                    <div className="row">
                        {shownBookmarks.map((bookmark, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                    <img className="card-img-top" src={bookmark.omdbPoster !=='N/A' ? bookmark.omdbPoster : noPoster} alt="poster" />
                                        <h5 className="card-bookmark">{bookmark.primaryTitle}</h5>
                                        <h5 className="card-bookmark">User Note :{bookmark.userNote}</h5>
                                        <button 
                                            onClick={() => {
                                                setModalShown(true)
                                                setEndpoint(`http://localhost:5001/api/bookmarks/${userId}/${bookmark.bookmarkId}`)
                                                setMessage('Bookmark removed')
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
}

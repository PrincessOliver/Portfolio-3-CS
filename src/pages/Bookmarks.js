import React, { useEffect, useState } from 'react';
import noPoster from '../Information_Missing_Mock_MC_Patch.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';

export const Bookmarks = () => {
    const [shownBookmarks, setShownBookmarks] = useState([]);
    const [userId, setUserId] = useState(null);
    const [ modalShown, setModalShown ] = useState(false)
    const [ bookmarkId, setBookmarkId ] = useState(null)
    const [ request, setRequest ] = useState(null)

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

    const removeBookmark = async bookmarkId => {
        try {
            const res = await fetch(`http://localhost:5001/api/bookmarks/${userId}/${bookmarkId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json()
            if (json) {
                toast.success('Bookmark removed')
                getBookmarks(`http://localhost:5001/api/bookmarks/${userId}`);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const removeBookmarks = async () => {
        try {
            const res = await fetch(`http://localhost:5001/api/bookmarks/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json()
            if (json) {
                toast.success('All bookmarks removed')
                getBookmarks(`http://localhost:5001/api/bookmarks/${userId}`);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <ConfirmDeleteModal
                shown={modalShown}
                setShown={setModalShown}
                removeItem={removeBookmark} 
                removeAllItems={removeBookmarks}
                id={bookmarkId}
                request={request}
            />
            <ToastContainer />
            <div>
                <div className="container mt-4">
                    <h2>Bookmarks</h2>
                    <button
                        onClick={() => {
                            setModalShown(true)
                            setRequest('all')
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
                                                setBookmarkId(bookmark.bookmarkId)
                                                setRequest('one')
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

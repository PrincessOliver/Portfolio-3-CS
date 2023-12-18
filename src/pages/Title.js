import { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';
import { useParams, useLocation } from 'react-router-dom';

export const Title = () => {
    const { id } = useParams()
    const [ movie, setMovie ] = useState(null)
    const [ bookmarked, setBookmarked ] = useState(false)
    const location = useLocation()

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/titles/${id}`)
                const json = await res.json()

                let json2 = null

                if (localStorage.getItem('token')) {
                    const res2 = await fetch(`http://localhost:5001/api/ratings/${localStorage.getItem('userId')}/${id}`)
                    json2 = await res2.json()

                    const res3 = await fetch(`http://localhost:5001/api/bookmarks/by-title-id/${localStorage.getItem('userId')}/${id}`)
                    const json3 = await res3.json()
                    
                    if (json3.userId) {
                        setBookmarked(true)
                    }
                }
                
                setMovie({
                    id: json.id,
                    primaryTitle: json.primaryTitle,
                    type: json.type,
                    startYear: json.startYear,
                    endYear: json.endYear,
                    omdbReleaseDate: json.omdbReleaseDate,
                    awards: json.awards,
                    rated: json.rated,
                    year: json.year,
                    runtime: json.runtime,
                    poster: json.poster,
                    director: json.director,
                    totalSeasons: json.totalSeasons,
                    boxOffice: json.boxOffice,
                    country: json.country,
                    actors: json.actors,
                    writer: json.writer,
                    weightAvgRating: json.weightAvgRating,
                    rating: json2 && json2.rating
                })
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [location])

    const rateTitle = async newRating => {
        try {
            const res = await fetch('http://localhost:5001/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId'),
                    titleId: movie.id,
                    rating: newRating,
                    timeStamp: new Date()
                })
            })
            const json = await res.json()
            toast.success(`Title rated with ${newRating}`)
        }
        catch (err) {
            console.log(err)
        }
    };

    const addToBookmarks = async () => {
        try {
            if (localStorage.getItem('token')) {
                const res = await fetch('http://localhost:5001/api/bookmarks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        titleId: movie.id
                    })
                })
                const json = await res.json()
                
                if (json) {
                    toast.success('Added to bookmarks');
                    setBookmarked(true)
                }
            } else {
                toast.error('You have to be logged in')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return ( 
        <> 
            {movie && <div className="movie"> 
                <img src={movie.poster} alt='poster' /> 
                {movie.titleId && (<p hidden>titleId: {movie.titleId}</p>)}
                {movie.primaryTitle && (<p>primaryTitle: {movie.primaryTitle}</p>)}
                {movie.type && movie.type !== 'N/A' && movie.type.length !== 0 && <p>type: {movie.type} </p>}
                {movie.startYear && movie.startYear !== 'N/A' && movie.startYear.length !== 0 && <p>startYear: {movie.startYear} </p>}
                {movie.endYear && movie.endYear !== 'N/A' && movie.endYear.trim().length !== 0 &&  <p>endYear: {movie.endYear} </p>}
                {movie.omdbReleaseDate && movie.omdbReleaseDate !== 'N/A' && movie.omdbReleaseDate.length !== 0 && <p>omdbReleaseDate: {movie.omdbReleaseDate} </p>}
                {movie.awards && movie.awards !== 'N/A' && movie.awards.length !== 0 && <p>awards: {movie.awards} </p>}
                {movie.rated && movie.rated !== 'N/A' && movie.rated.length !== 0 && <p>rated: {movie.rated} </p>}
                {movie.year && movie.year !== 'N/A' && movie.year.length !== 0 && <p>year: {movie.year} </p>}
                {(movie.runtime && movie.runtime !== 'N/A' && movie.runtime.length !== 0 && <p>runtime: {movie.runtime} </p>)}
                {movie.director && movie.director !== 'N/A' && movie.director.length !== 0 && <p>director: {movie.director} </p>}
                {(movie.totalSeasons && movie.totalSeasons !== 'N/A') && movie.totalSeasons.length !== 0 && <p>totalSeasons: {movie.totalSeasons} </p>}
                {(movie.boxOffice && movie.boxOffice !== 'N/A' && movie.boxOffice.length !== 0 && (<p>boxOffice: {movie.boxOffice} </p>))}
                {movie.country && movie.country !== 'N/A' && movie.country.length !== 0 && <p>country: {movie.country} </p>}
                {movie.actors && movie.actors !== 'N/A' && movie.actors.length !== 0 && <p>actors: {movie.actors} </p>}
                {movie.writer && movie.writer !== 'N/A' && movie.writer.length !== 0 && <p>writer: {movie.writer} </p>}
                {movie.weightAvgRating && movie.weightAvgRating !== 'N/A' && movie.weightAvgRating.length !== 0 && <p>weightAvgRating: {movie.weightAvgRating} </p>}
              
                <ReactStars 
                    count={10}
                    onChange={rateTitle}
                    size={30}
                    activeColor="#ffd700"
                    value={movie.rating}
                    edit={localStorage.getItem('token') !== null}
                />
                <button 
                    disabled={bookmarked}
                    onClick={() => {
                        addToBookmarks()
                    }}
                >
                    {bookmarked ? 'BOOKMARKED' : 'ADD TO BOOKMARKS'}
                </button>
            </div>
            }
        </>
    )
}
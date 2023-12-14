import { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';

export const Title = () => {
    const [ movie, setMovie ] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/titles/${window.location.search.slice(1)}`)
                const json = await res.json()

                const res2 = await fetch(`http://localhost:5001/api/ratings/${localStorage.getItem('userId')}/${window.location.search.slice(1)}`)
                const json2 = await res2.json()
                
                setMovie({
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
                    rating: json2.rating
                })
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const ratingChanged = async (newRating) => {
        try {
            await fetch('http://localhost:5001/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId'),
                    titleId: window.location.search.slice(1),
                    rating: newRating
                })
            })
            // const json = await res.json()
        }
        catch (err) {
            console.log(err)
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
                })
            })
            const json = await res.json()
            
            if (json) {
                toast.success('Added to bookmarks');
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <> 
            <ToastContainer />
            {movie && <div className="movie">
                <img src={movie.poster} alt='poster' />
                <p>primaryTitle: {movie.primaryTitle}</p>
                <p>type: {movie.type}</p>
                <p>startYear: {movie.startYear}</p>
                {movie.endYear.trim().length !== 0 && <p>endYear: {movie.endYear}</p>}
                <p>omdbReleaseDate: {movie.omdbReleaseDate}</p>
                <p>awards: {movie.awards}</p>
                <p>rated: {movie.rated}</p>
                <p>year: {movie.year}</p>
                <p>runtime: {movie.runtime}</p>
                <p>director: {movie.director}</p>
                <p>totalSeasons: {movie.totalSeasons}</p>
                <p>boxOffice: {movie.boxOffice}</p>
                <p>country: {movie.country}</p>
                <p>actors: {movie.actors}</p>
                <p>writer: {movie.writer}</p>
                <p>weightAvgRating: {movie.weightAvgRating}</p>
                <ReactStars
                    count={10} // could it perhaps be a float?
                    onChange={ratingChanged}
                    size={30}
                    activeColor="#ffd700"
                    value={movie.rating}
                />
                <button onClick={(e) => addToBookmarks(e)}>ADD TO BOOKMARKS</button>
            </div>
            }
        </>
    )
}
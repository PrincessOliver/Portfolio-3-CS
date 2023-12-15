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
                {movie.titleId && (<p hidden>titleId: {movie.titleId}</p>)}
                {movie.primaryTitle && (<p>primaryTitle: {movie.primaryTitle}</p>)}
                {movie.type && movie.type !== 'N/A' && movie.type.length !== 0 && <p>type: {movie.type} </p>}
                {movie.startYear && movie.startYear !== 'N/A' && movie.startYear.length !== 0 && <p>startYear: {movie.startYear} </p>}
                {movie.endYear && movie.endYear !== 'N/A' && movie.endYear.length !== 0 && <p>endYear: {movie.endYear} </p>}
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
import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"
import ReactStars from "react-rating-stars-component";

export const Movie = () => {
    const [ movie, setMovie ] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/titles/${window.location.search.slice(1)}`)
                const json = await res.json()

                const res2 = await fetch(`http://localhost:5001/api/ratings/${localStorage.getItem('userId')}/${window.location.search.slice(1)}`)
                const json2 = await res2.json()
                
                setMovie({
                    type: json.type,
                    primaryTitle: json.primaryTitle,
                    startYear: json.startYear,
                    endYear: json.endYear,
                    omdbTitle: json.omdbTitle,
                    omdbYear: json.omdbYear,
                    omdbReleaseDate: json.omdbReleaseDate,
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

    return (
        <>
            <NavBar />
            {movie && <div className="movie">
                <img src={localStorage.getItem('clickedTitle')} alt='poster' />
                <p>type: {movie.type}</p>
                <p>primaryTitle: {movie.primaryTitle}</p>
                <p>startYear: {movie.startYear}</p>
                <p>endYear: {movie.endYear}</p>
                <p>omdbTitle: {movie.omdbTitle}</p>
                <p>omdbYear: {movie.omdbYear}</p>
                <p>omdbReleaseDate: {movie.omdbReleaseDate}</p>
                <span>Rate</span>
                <ReactStars
                    count={10}
                    onChange={ratingChanged}
                    size={30}
                    activeColor="#ffd700"
                    value={movie.rating}
                />,
            </div>
            }
        </>
    )
}
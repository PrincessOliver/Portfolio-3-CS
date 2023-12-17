import React, { useEffect, useState } from "react"
import noPoster from '../Information_Missing_Mock_MC_Patch.jpg';

export const RatingHistory = () => {
    const [ ratings, setRatings ] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/ratings/${localStorage.getItem('userId')}`)
                const json = await res.json()

                setRatings(json)
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (
       <>
       <div>
        <div className="container mt-4">
            <h2>Rating History</h2>
            <div className="row">
                {ratings && ratings.map((rating, index) => {
                    return <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                            <img className="card-img-top" src={rating.omdbPoster !=='N/A' ? rating.omdbPoster : noPoster} alt="poster" />
                            <h5 className="card-rating">{rating.primaryTitle}</h5>
                            <p className="card-rating">{/*rating.userId*/}</p>
                            <p className="card-rating">{/*rating.titleId*/}</p>
                            <h5 className="card-rating">{rating.rating}/10</h5>
                            <h6 className="card-rating">{rating.timeStamp.split('T')[0]} - {rating.timeStamp.split('T')[1].slice(0, 8)}</h6>                                                                                     
                            </div>
                        </div>                
                    </div>
                    })
                    }
                </div>
            </div>
        </div>
        </> 
        
    )
}

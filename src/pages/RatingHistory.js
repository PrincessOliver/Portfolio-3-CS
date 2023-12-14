import React, { useEffect, useState } from "react"

export const RatingHistory = () => {
    const [ ratings, setRatings ] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/ratings/${localStorage.getItem('userId')}`)
                const json = await res.json()

                console.log(json)

                setRatings(json)
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (
       <>
            {ratings && ratings.map((rating, index) => {
                return <div key={index}>
                <p>{rating.titleId}</p>
                <p>{rating.rating}</p>
                <p>{rating.timeStamp.split('T')[0]} - {rating.timeStamp.split('T')[1].slice(0, 8)}</p>
            </div>
            })
            }
        </> 
    )
}
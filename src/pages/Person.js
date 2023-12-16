import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Person = () => {
    const { id } = useParams()
    const [ person, setPerson ] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:5001/api/person/${id}`)
            const json = await res.json()
            setPerson(json)
        })()
    }, [])

    return (
        <div>
            {person && 
                <div>
                    <h1>{person.fullName}</h1>
                    <h1>Born {person.birthYear}</h1>
                    <h1>{person.deathYear.trim().length !== 0 && person.deathYear}</h1>
                    <h1>{person.profession}</h1>
                    <h1>Known for {person.knownForTitles}</h1>
                </div>
            }
        </div>
    )
}
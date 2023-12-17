import { useEffect, useState } from "react";
import { getData } from "../requests/FetchData";

export const GetGenres = () => {
    const [ genres, setGenres ] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await getData('http://localhost:5001/api/titles/genres')
            setGenres(data)
        })()
    }, [])

    return genres
}
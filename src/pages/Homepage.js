import { NavBar } from "../components/NavBar";
import React, { useEffect, useState } from 'react';

export const Homepage = () => {
    const [shownTitles, setshownTitles] = useState(null)

    const loggedIn = localStorage.length > 0;

    useEffect(() => {
        getTitles('http://localhost:5001/api/titles')
    }, [])

    const getTitles = async endpoint => {
        const res = await fetch(endpoint)
        const json = await res.json()
    }

    return (
        <>
            <NavBar loggedIn={loggedIn} />
            {/* {} */}
        </>
    )
}
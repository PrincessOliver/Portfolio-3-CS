import { GetGenres } from "../hooks/GetGenres"
import { Genre } from "./Genre"
import { Link } from "react-router-dom"

export const Genres = () => {
    const genres = GetGenres()

    return (
        <li className="nav-item dropdown dropdown-genres">
            <Link className="nav-link dropdown-toggle" to="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Genres
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {genres && genres.map((genre, index) => {
                    return <Genre key={index} genre={genre.titleGenre} />
                })}
            </div>
        </li>
    )
}
import { GetGenres } from "../hooks/GetGenres"
import { Genre } from "./Genre"

export const Genres = () => {
    const genres = GetGenres()

    return (
        <li className="nav-item dropdown dropdown-genres">
            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Genres
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {genres && genres.map((genre, index) => {
                    return <Genre key={index} genre={genre.titleGenre} />
                })}
            </div>
        </li>
    )
}
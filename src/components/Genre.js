import { Link } from "react-router-dom"

export const Genre = ({ genre }) => {
    return (
        <Link className="dropdown-item" to={'/titles/' + genre}>{genre}</Link>
    )
}
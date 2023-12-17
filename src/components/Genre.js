export const Genre = ({ genre }) => {
    return (
        <a className="dropdown-item" href={'/titles/' + genre}>{genre}</a>
    )
}
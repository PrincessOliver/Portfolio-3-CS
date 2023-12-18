import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import noPoster from '../Information_Missing_Mock_MC_Patch.jpg';

const GenrePage = () => {
  const { genre } = useParams();
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTitlesByGenre(`http://localhost:5001/api/titles/genre/${genre}`);
  }, [location]);

  useEffect(() => {
    if (page > 0) {
      fetchTitlesByGenre(`http://localhost:5001/api/titles/genre/${genre}?page=${page - 1}&pageSize=10`);
    }
  }, [page]);

  const fetchTitlesByGenre = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data && Array.isArray(data.items)) setTitles(data);
    } catch (error) {
      console.error(`Error fetching titles for genre ${genre}`, error);
    }
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        previousLabel="previous"
        renderOnZeroPageCount={null}
        pageCount={titles.numberOfPages}
        onPageChange={(e) => setPage(e.selected + 1)}
        marginPagesDisplayed={3}
        containerClassName='pagination'
        activeClassName='pagination-active'
      />
      <div className="container mt-4">
        <h2>{genre} Titles</h2>
        <div className="row">
          {titles.items?.map((title, index) => (
            <GenreTitleCard key={index} title={title} />
          ))}
        </div>
      </div>
    </>
  );
};

const GenreTitleCard = ({ title }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/title/${title.id}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img className="card-img-top" src={title.poster !== 'N/A' ? title.poster : noPoster} alt="poster" />
        <div className="card-body">
          <h5 className="card-title">{title.name}</h5>
          <p className="card-text">{title.weightAvgRating}</p>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const GenrePage = () => {
  const { genre } = useParams();
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(0);

  console.log(genre)

  useEffect(() => {
    fetchTitlesByGenre(`http://localhost:5001/api/titles/genre/${genre}`);
  }, []);

  useEffect(() => {
    if (page > 0) fetchTitlesByGenre(`http://localhost:5001/api/titles/genre/${genre}?page=${page - 1}&pageSize=10`)
  }, [page])

  const fetchTitlesByGenre = async endpoint => {
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
            // pageRangeDisplayed={5}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            pageCount={titles.numberOfPages}
            onPageChange={(e) => setPage(e.selected + 1)}
            marginPagesDisplayed={3}
            containerClassName='pagination'
            activeClassName='pagination-active'
        />
        <h2>{genre} Titles</h2>
        {titles.items?.map((title, index) => (
          <ul key={index}>
            <li>{title.name}</li>
            <li>{title.weightAvgRating}</li>
            <img src={title.poster} alt='poster' />
          </ul>
        ))}
    </>
  );
};

export default GenrePage;

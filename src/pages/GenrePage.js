import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GenrePage = () => {
  const { genre } = useParams();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitlesByGenre = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/titles/genre/${genre}`);

        const data = await response.json();
        setTitles(data.titles);
      } catch (error) {
        console.error(`Error fetching titles for genre ${genre}`, error);
      }
    };

    fetchTitlesByGenre();
  }, [genre]);

  return (
    <>
      <div>
        <h2>{genre} Titles</h2>
        {titles.map((title, index) => (
          <ul key={index}>
            <li>Name: {title.name}</li>
            <li>URL: {title.url}</li>
            <li>Weighted Avg Rating: {title.weightAvgRating}</li>
            <li>Poster: {title.poster}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default GenrePage;

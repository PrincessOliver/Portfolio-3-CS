import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GenrePage = () => {
  const { genre } = useParams();
  const [titles, setTitles] = useState(null);

  useEffect(() => {
    const fetchTitlesByGenre = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/titles/genre/${genre}`);
        const data = await response.json();
        setTitles(data);
      } catch (error) {
        console.error(`Error fetching titles for genre ${genre}`, error);
      }
    };

    fetchTitlesByGenre();
  }, []);

  return (
    <>
      <div>
        <h2>{genre[0].toUpperCase() + genre.slice(1)} Titles</h2>
        {titles && titles.items.map((title, index) => (
          <ul key={index}>
            <li>{title.name}</li>
            <li>{title.weightAvgRating}</li>
            <img src={title.poster} alt='poster' />
          </ul>
        ))}
      </div>
    </>
  );
};

export default GenrePage;

import React, { useEffect, useState } from 'react';

import './Row.css';
import axiosInstance from '../api/axios';

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await axiosInstance.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchMovieData();
  }, [fetchUrl]);

  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'>{'<'}</span>
        </div>

        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      <div className='slider__arrow-right'>
        <span className='arrow'>{'>'}</span>
      </div>
    </div>
  );
};

export default Row;

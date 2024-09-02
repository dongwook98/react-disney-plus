import React, { useEffect, useState } from 'react';

import './Row.css';
import axiosInstance from '../api/axios';
import MovieModal from './MovieModal';

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await axiosInstance.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchMovieData();
  }, [fetchUrl]);

  const handleClickMoviePoster = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {'<'}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => {
                handleClickMoviePoster(movie);
              }}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {'>'}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;

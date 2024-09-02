import React, { useEffect, useState } from 'react';

import './Banner.css';
import axiosInstance from '../api/axios';
import requests from '../api/request';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 현재 상영중인 영화 정보를 가져오기(여러 영화)
      const response = await axiosInstance.get(requests.fetchNowPlaying);
      // 여러 영화 중 랜덤하게 하나의 영화 id만 받아오기
      const movieId =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ].id;

      // 특정 영화의 더 상세한 정볼르 가져오기 (비디오 정보도 포함)
      const { data: movieDetail } = await axiosInstance.get(
        `movie/${movieId}`,
        {
          params: { append_to_response: 'videos' },
        }
      );
      setMovie(movieDetail);
    };

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n) + '...' : string;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className='banner__buttons'>
          {movie?.videos?.results[0]?.key && (
            <button className='banner__button play'>Play</button>
          )}
        </div>
        <p className='banner__description'>{truncate(movie.overview, 100)}</p>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  );
};

export default Banner;

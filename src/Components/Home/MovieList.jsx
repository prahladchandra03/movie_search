import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieItem from './MovieItem';
import NoMovies from './NoMovies';
import '../../css/MovieList.css';
 
import {singleMovieDetail } from '../../redux/actions/movieActions';

const MovieList = () => {
  const movies = useSelector((state) => state.movie.movies);
  const loading = useSelector((state) => state.movie.loading);
  const dispatch = useDispatch();

   

  return (
    <div>
      <div className="mt-[10vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-7 px-4">
        {loading
          ? [...new Array(12)].map((_, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg"
                style={{ height: '400px' }}
              >
                <div className="skeleton h-3/4 w-full"></div>
                <div className="p-4">
                  <div className="skeleton h-5 w-4/5 mb-2"></div>
                  <div className="skeleton h-5 w-3/5"></div>
                </div>
              </div>
            ))
          : movies?.length > 0
          ? movies.map((movie) => (
              <MovieItem
                key={movie.imdbID}
                movie={movie}
                onClick={() => dispatch(singleMovieDetail(movie.imdbID))}
              />
            ))
          : <NoMovies  text={"No movies found. Try a different search."}/>}
      </div>
    </div>
  );
};

export default MovieList;

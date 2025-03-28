import axios from 'axios';

// Action Types
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SELECT_MOVIE = 'SELECT_MOVIE';

// Action Creators
export const fetchMoviesRequest = () => ({ type: FETCH_MOVIES_REQUEST });
export const fetchMoviesSuccess = (movies) => ({ type: FETCH_MOVIES_SUCCESS, payload: movies });
export const fetchMoviesFailure = (error) => ({ type: FETCH_MOVIES_FAILURE, payload: error });
export const selectMovie = (movie) => ({ type: SELECT_MOVIE, payload: movie });

const apikey = process.env.REACT_APP_OMDB_API_KEY;

export const fetchMovies = (query) => (dispatch) => {
  dispatch(fetchMoviesRequest());
  
  axios.get(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}`)
    .then(response => {
      // Check if API returned valid response
      if (response.data.Response === 'True') {
        dispatch(fetchMoviesSuccess(response.data.Search));
      } else {
        // Handle API error messages
        dispatch(fetchMoviesFailure(response.data.Error || 'No movies found'));
      }
    })
    .catch(error => {
      // Handle network errors
      const errorMessage = error.response?.data?.Error || error.message;
      dispatch(fetchMoviesFailure(errorMessage));
    });
};

export const singleMovieDetail = (id) => (dispatch) => {
  axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apikey}`)
    .then(response => {
      if (response.data.Response === 'True') {
        dispatch(selectMovie(response.data));
      } else {
        dispatch(fetchMoviesFailure(response.data.Error || 'Movie details not found'));
      }
    })
    .catch(error => {
      const errorMessage = error.response?.data?.Error || error.message;
      dispatch(fetchMoviesFailure(errorMessage));
    });
};
import React from 'react';
import "../../css/MovieItem.css"
const MovieItem = ({ movie, onClick }) => {

  return(
  <div
    className=" border rounded-lg  shadow-lg cursor-pointer h-[400px]"
    onClick={onClick}  
  >
    <img
      src={movie?.Poster}
      alt={movie?.Title}
      className="w-full h-4/5 object-cover rounded-tr-lg rounded-tl-lg"  
    />
    <div className="p-4 h-1/5">
    <h3 className="text-lg font-semibold truncate-text">{movie?.Title}</h3>
      <p className="text-gray-500">{movie?.Year}</p>
    </div>
  </div>
  )
};

export default MovieItem;

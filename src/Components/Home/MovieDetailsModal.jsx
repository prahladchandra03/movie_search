import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { selectMovie } from '../../redux/actions/movieActions';
import "../../css/MovieDetailModal.css"
const MovieDetailsModal = () => {
  const {selectedMovie} = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 px-2">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative text-black shadow-lg  h-[330px]">
        <button
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-900"
          onClick={() => dispatch(selectMovie(null))}
        >
          <RxCross2 size={21} className='text-slate-500'/>
        </button>
        <div className="flex flex-col gap-4 items-start h-full">
       
          <h2 className="text-lg font-semibold mb-3 text-slate-700">{selectedMovie.Title}</h2>
          
          <div className="border rounded-lg p-4 w-full bg-gray-50 customScrollbar h-3/4">
            <div className="text-lg mb-2">
              <h2 className='inline-block text-base font-semibold text-slate-600'>Genre:</h2> <span className='text-sm text-slate-600'>{selectedMovie.Genre}</span>
            </div>
            <div className="text-base mb-2">
              <h2 className='inline-block text-base font-semibold text-slate-600'>IMDb Rating:</h2> <span className='text-sm text-slate-600'> {selectedMovie.imdbRating}</span>
            </div>
            <div className="text-base mb-2">
              <h2 className='inline-block text-base font-semibold text-slate-600'>Writer:</h2> <span className='text-sm text-slate-600'>{selectedMovie.Writer}</span>
            </div>
            <div className="text-base mb-2">
              <h2 className='inline-block text-base font-semibold text-slate-600'>Actors:</h2> <span className='text-sm text-slate-600'>{selectedMovie.Actors} </span>
            </div>
            <div className="text-base">
              <h2 className='inline-block text-base font-semibold text-slate-600'>Plot Summary:</h2> <span className='text-sm text-slate-600'>{selectedMovie.Plot}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;

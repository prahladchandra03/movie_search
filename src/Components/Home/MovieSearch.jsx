import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { fetchMovies } from "../../redux/actions/movieActions";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    
    const handler = setTimeout(() => {
      if (query) {
        dispatch(fetchMovies(query));
      }
      else if(query===""){
        dispatch(fetchMovies("popular"));
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center bg-slate-700 border rounded-xl pr-2 max-w-[380px] w-[100%] mr-[10%] border-white">
      <input
        type="text"
        placeholder="Search movies..."
        className="py-[10px] pl-4 pr-3 rounded-md w-full bg-transparent text-white focus:outline-none"
        value={query}
        onChange={handleInputChange}
      />
      <button className="ml-2 p-2 rounded">
        <FaSearch />
      </button>
    </div>
  );
};

export default MovieSearch;

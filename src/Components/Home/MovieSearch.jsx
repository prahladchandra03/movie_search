import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import { fetchMovies } from "../../redux/actions/movieActions";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        dispatch(fetchMovies(query));
      } else {
        dispatch(fetchMovies("popular")); // Show popular movies when empty
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchMovies(query));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center bg-slate-700 border rounded-xl pr-2 max-w-[380px] w-full mr-[10%] border-white hover:border-slate-300 transition-colors"
    >
      <input
        type="text"
        aria-label="Search movies"
        placeholder="Search movies..."
        className="py-[10px] pl-4 pr-3 rounded-md w-full bg-transparent text-white focus:outline-none placeholder:text-slate-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      
      <button
        type="submit"
        aria-label="Search"
        className={`ml-2 p-2 rounded-full transition-colors ${
          isTyping ? "text-white" : "text-slate-300"
        } hover:text-white hover:bg-slate-600`}
      >
        <FaSearch className="w-5 h-5" />
      </button>
    </form>
  );
};

MovieSearch.propTypes = {
  initialQuery: PropTypes.string,
};

export default MovieSearch;
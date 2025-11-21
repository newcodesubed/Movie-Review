import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Cards from "../cards/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);       
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`
      );

      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();

      
      setMovieList(data.results.slice(0, 10));

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  getData();
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
}, [page]);

  return (
    <div className="movie__list">
      <h2 className="list__title">TOP RATED</h2>

      {loading && <p className="loading">Loading movies...</p>}
      {error && <p className="error">{error}</p>}

      <div className="list__cards">
        {!loading && !error && 
          movieList.map((movie) => <Cards key={movie.id} movie={movie} />)
        }
      </div>

      <div className="pagination">
        <button 
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="page-number">Page {page}</span>

        <button 
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;

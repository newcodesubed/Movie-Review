import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/cards/Card";
import Header from "../../components/header/Header";
import "./GenrePage.css";

export default function GenrePage() {
  const { genreId } = useParams();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);   
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [genreName, setGenreName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        const genre = data.genres.find(g => g.id === parseInt(genreId));
        if (genre) {
          setGenreName(genre.name);
        }
      } catch (err) {
        console.error("Failed to fetch genre name:", err);
      }
    };

    if (genreId) {
      fetchGenreName();
    }
  }, [genreId]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&with_genres=${genreId}&language=en-US&page=${page}`
        );

        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        
        setMovies(data.results.slice(0, 10) || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
        setError("Could not load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      getMovies();
    }
  }, [genreId, page]);

  
  const handleSearch = useCallback(
    async (query) => {
      if (!query) return;

      setLoading(true);

      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&query=${encodeURIComponent(query)}`
        );
        const data = await resp.json();

        navigate(`/search?q=${encodeURIComponent(query)}`, {
          state: { results: data.results || [], query },
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <div className="genre-page">
      <Header onSearch={handleSearch} />

      <div className="genre-container">
        <h2 className="genre-title">{genreName ? `${genreName} Movies` : "Genre Movies"}</h2>

        {error && (
          <p className="genre-error">{error}</p>
        )}

        {loading && <p className="genre-loading">Loading...</p>}

        <div className="genre-movie-grid">
          {!loading &&
            !error &&
            movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
        </div>

        {!loading && !error && movies.length > 0 && (
          <div className="genre-pagination">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage((prev) => prev - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ◀ Prev
            </button>

            <span className="genre-page-info">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => {
                setPage((prev) => prev + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/cards/Card";
import Header from "../../components/header/Header";

export default function GenrePage() {
  const { genreId } = useParams();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);   // ✅ page state
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 Fetch movies every time genreId OR page changes
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
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
        setError("Could not load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [genreId, page]);

  // 🔍 Search handler
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
    <>
      <Header onSearch={handleSearch} />

      <div style={{ padding: "20px" }}>
        <h2>Genre Results</h2>

        {/* ERROR */}
        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        )}

        {/* LOADING */}
        {loading && <p>Loading...</p>}

        {/* MOVIE GRID */}
        <div className="movie-list">
          {!loading &&
            !error &&
            movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
        </div>

        {/* PAGINATION */}
        {!loading && !error && movies.length > 0 && (
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <button
              disabled={page === 1}
              onClick={() => {
                setPage((prev) => prev - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ◀ Prev
            </button>

            <span style={{ color: "white", alignSelf: "center" }}>
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
    </>
  );
}

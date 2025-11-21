import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/cards/Card";
import Header from "../../components/header/Header";

export default function GenrePage() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [genreId]);

   const handleSearch = useCallback(async (query) => {
      if (!query) return; // ignore empty
  
      setLoading(true);
  
      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await resp.json();
        const results = data.results || [];
  
        // Navigate to SearchPage with results in state
        navigate(`/search?q=${encodeURIComponent(query)}`, { state: { results, query } });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, [navigate]);
  return (
    <>
      <Header onSearch={handleSearch} />
      <div style={{ padding: "20px" }}>
        <h2>Genre Results</h2>

        <div className="movie-list">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

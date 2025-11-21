import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Card from "../../components/cards/Card";
import "./FavoritesPage.css";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);
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

  if (favorites.length === 0)
    return (
      <>
        <Header onSearch={handleSearch} />
        <div style={{ padding: "20px", textAlign: "center", color: "white" }}>
          <h2>No favorite movies yet.</h2>
          <p>Go to Home or Search to add some movies to your favorites!</p>
        </div>
      </>
    );

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="favorites-page">
        <h2 style={{ padding: "20px", color:"white" }}>Your Favorite Movies</h2>
        <div className="movie-grid">
          {favorites.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

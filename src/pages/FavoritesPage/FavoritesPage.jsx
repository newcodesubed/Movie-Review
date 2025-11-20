import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Card from "../../components/cards/Card";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  if (favorites.length === 0)
    return (
      <>
        <Header />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>No favorite movies yet.</h2>
          <p>Go to Home or Search to add some movies to your favorites!</p>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="favorites-page">
        <h2 style={{ padding: "20px" }}>Your Favorite Movies</h2>
        <div className="movie-grid">
          {favorites.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

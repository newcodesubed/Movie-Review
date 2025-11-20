import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/cards/Card";
import Header from "../../components/header/Header";

export default function GenrePage() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [genreId]);

  return (
    <>
      <Header />
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

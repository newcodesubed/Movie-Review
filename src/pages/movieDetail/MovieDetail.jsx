import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";

export default function MovieDetail() {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  // Track if this movie is already a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch movie details
  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        // Check if movie is already in favorites
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.id === data.id));
      });
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  // Toggle favorite
  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;

    if (isFavorite) {
      // Remove from favorites
      updated = favorites.filter((fav) => fav.id !== currentMovieDetail.id);
    } else {
      // Add to favorites
      updated = [...favorites, currentMovieDetail];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!currentMovieDetail) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="movie">
        <div className="movie__intro">
          <img
            className="movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`}
            alt={currentMovieDetail.original_title}
          />
        </div>

        <div className="movie__detail">
          <div className="movie__detailLeft">
            <div className="movie__posterBox">
              <img
                className="movie__poster"
                src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`}
                alt={currentMovieDetail.original_title}
              />
            </div>
          </div>

          <div className="movie__detailRight">
            <div className="movie__detailRightTop">
              <div className="movie__name">{currentMovieDetail.original_title}</div>
              <div className="movie__tagline">{currentMovieDetail.tagline}</div>
              <div className="movie__rating">
                {currentMovieDetail.vote_average} <i className="fas fa-star" />
                <span className="movie__voteCount">
                  ({currentMovieDetail.vote_count}) votes
                </span>
              </div>
              <div className="movie__runtime">{currentMovieDetail.runtime} mins</div>
              <div className="movie__releaseDate">
                Release date: {currentMovieDetail.release_date}
              </div>
              <div className="movie__genres">
                {currentMovieDetail.genres.map((genre) => (
                  <span className="movie__genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Add to Favorites Button */}
              <button
                onClick={handleToggleFavorite}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: isFavorite ? "#ff4c4c" : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>

            <div className="movie__detailRightBottom">
              <div className="synopsisText">Synopsis</div>
              <div>{currentMovieDetail.overview}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

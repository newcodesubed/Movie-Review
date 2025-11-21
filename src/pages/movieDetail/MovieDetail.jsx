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
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
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
          {currentMovieDetail.backdrop_path ? (
            <img
              className="movie__backdrop"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`}
              alt={currentMovieDetail.original_title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="movie__backdrop-placeholder"
            style={{
              display: currentMovieDetail.backdrop_path ? 'none' : 'flex'
            }}
          >
            <div className="placeholder-content">
              <i className="fas fa-image"></i>
              <span>Backdrop Not Available</span>
            </div>
          </div>
        </div>

        <div className="movie__detail">
          <div className="movie__detailLeft">
            <div className="movie__posterBox">
              {currentMovieDetail.poster_path ? (
                <img
                  className="movie__poster"
                  src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`}
                  alt={currentMovieDetail.original_title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="movie__poster-placeholder"
                style={{
                  display: currentMovieDetail.poster_path ? 'none' : 'flex'
                }}
              >
                <div className="placeholder-content">
                  <i className="fas fa-film"></i>
                  <span>Poster Not Available</span>
                </div>
              </div>
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

              {/* Action Buttons */}
              <div className="movie__buttons">
                <button
                  onClick={handleToggleFavorite}
                  className={`movie__Button ${isFavorite ? 'movie__favoriteButton--active' : 'movie__favoriteButton'}`}
                >
                  <i className={`fas ${isFavorite ? 'fa-heart' : 'fa-heart'}`}></i>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                
                <button className="movie__Button movie__watchButton">
                  <i className="fas fa-play"></i>
                  Watch Now
                </button>
              </div>
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

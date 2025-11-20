import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from 'react-router-dom';
import MovieList from '../../components/moiveList/MovieList';
import Header from '../../components/header/Header';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch popular movies on mount
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setPopularMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  // Search handler called from Header
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

      <div className="poster">
        {popularMovies.length > 0 ? (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
            infiniteLoop={true}
            showStatus={false}
            stopOnHover={false}
            swipeable={true}
            emulateTouch={true}
            useKeyboardArrows={true}
          >
            {popularMovies.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
              <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.original_title} />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie?.original_title}</div>
                <div className="posterImage__runtime">
                  {movie?.release_date}
                  <span className="posterImage__rating">
                    {movie?.vote_average} <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage__description">{movie?.overview}</div>
              </div>
            </Link>
          ))}
          </Carousel>
        ) : (
          <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
            <h2>{loading ? 'Searching movies...' : 'Loading movies...'}</h2>
          </div>
        )}

        <MovieList />
      </div>
    </>
  );
}

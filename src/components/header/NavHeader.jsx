import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
   const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const genreRef = useRef(null);
  
  
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  const handleGenreClick = () => {
    setShowDropdown((p) => !p);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genreRef.current && !genreRef.current.contains(event.target) && 
          !event.target.closest('.genreDropdown') &&
          !event.target.closest('.genre-wrapper')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const onGenreSelect = (genreId) => {
    navigate(`/genre/${genreId}`);
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <span className="logo"
            style={{
              color: "red",
              fontWeight: "bold",
              fontFamily: "cursive",
              fontSize: "24px",
            }}
          >
            HmroCinema
          </span>
        </Link>

        <Link to="/movie/favorite" style={{ textDecoration: "none" }}>
          <span>Favorites</span>
        </Link>

        <div className="genre-wrapper">
          <span
            ref={genreRef}
            onClick={handleGenreClick}
            className="genreLabel"
          >
            Genre
          </span>

          {showDropdown && (
            <div className="genreDropdown">
              <h3>Browse by Genre</h3>
              <div className="genreGrid">
                {genres.map((g) => (
                  <div
                    key={g.id}
                    className="genreOption"
                    onClick={() => onGenreSelect(g.id)}
                  >
                    {g.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}

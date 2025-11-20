import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Search from "../search/Search";

export default function Header({ onSearch }) {
   const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSearch = (searchTerm) => {
    if (onSearch) onSearch(searchTerm);
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);
  const onGenreSelect = (genreId) => {
    navigate(`/genre/${genreId}`);
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <span
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

        <span
          onClick={() => setShowDropdown((p) => !p)}
          className="genreLabel"
        >
          Genre ▾
        </span>

        {showDropdown && (
          <div className="genreDropdown">
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
        )}
      </div>

      <div className="headerCenter">
        <Search onSearch={handleSearch} placeholder="Search movies..." />
      </div>

      <div className="headerRight"></div>
    </div>
  );
}

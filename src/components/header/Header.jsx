import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="header">
        <div className="headerLeft">
        <Link to='/' style={{textDecoration: "none", cursor: "pointer"}}>
    <span style={{color:"red", fontWeight:"bold", fontFamily:"cursive",fontSize: "24px"}}> HmroCinema</span>
        </Link>
        <Link to="/movie/favorite" style={{textDecoration: "none", cursor: "pointer"}}>
          <span>Favorites</span>
        </Link>
        <Link to="movies/:type" style={{textDecoration: "none", cursor: "pointer"}}>
            <span>Genre</span>
        </Link>
        </div>
      
    </div>
  );
}
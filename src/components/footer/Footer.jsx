import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__overlay">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">MovieApp</h3>
            <p className="footer__description">
              Your ultimate destination for discovering and exploring movies. 
              Find ratings, reviews, and details about your favorite films.
            </p>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="/">Home</a></li>
              <li><a href="/movies">Movies</a></li>
              <li><a href="/favorites">Favorites</a></li>
              <li><a href="/search">Search</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Categories</h4>
            <ul className="footer__links">
              <li><a href="/movies/popular">Popular</a></li>
              <li><a href="/movies/top_rated">Top Rated</a></li>
              <li><a href="/movies/upcoming">Upcoming</a></li>
              <li><a href="/movies/now_playing">Now Playing</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Follow Us</h4>
            <div className="footer__social">
              <a href="#" className="footer__social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p>&copy; 2024 MovieApp. All rights reserved.</p>
            <div className="footer__bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
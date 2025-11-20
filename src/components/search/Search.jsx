import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = ({ onSearch, placeholder = "Search movies..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      onSearch && onSearch(debouncedSearchTerm);
    } else if (debouncedSearchTerm === '') {
      onSearch && onSearch(''); // explicit clear
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    onSearch && onSearch('');
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="clear-button" type="button">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;

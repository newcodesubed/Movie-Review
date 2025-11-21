import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/cards/Card';
import NavHeader from '../../components/header/NavHeader';

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const query =
    location.state?.query ||
    new URLSearchParams(location.search).get('q') ||
    '';

  const [results, setResults] = useState(location.state?.results || []);
  const [loading, setLoading] = useState(!location.state?.results);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);              
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&query=${encodeURIComponent(query)}&page=${page}`
        );

        if (!res.ok) throw new Error('Failed to fetch search results');

        const data = await res.json();

        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
        setError('Unable to load results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();


    navigate(`/search?q=${encodeURIComponent(query)}&page=${page}`, {
      replace: true,
    });

  }, [query, page, navigate]);

  return (
    <>
      <NavHeader />

      <div style={{ padding: 20 }}>
        <h2 style={{ color: 'white' }}>Search results for "{query}"</h2>


        {loading && <p style={{ color: 'white' }}>Loading...</p>}

  
        {error && <p style={{ color: 'red' }}>{error}</p>}


        {!loading && !error && results.length === 0 && (
          <p style={{ color: 'white' }}>No results found.</p>
        )}


        <div
          className="movie-grid"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}
        >
          {!loading &&
            !error &&
            results.map((movie) => <Card key={movie.id} movie={movie} />)}
        </div>


        {!loading && !error && results.length > 0 && (
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <button
              disabled={page === 1}
              onClick={() => {
                setPage((prev) => prev - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ◀ Prev
            </button>

            <span style={{ color: 'white' }}>
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => {
                setPage((prev) => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </>
  );
}

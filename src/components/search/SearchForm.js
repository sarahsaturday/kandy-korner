import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SearchForm.css';

export const SearchForm = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery !== '') {
      setIsSearching(true);
      fetch(`http://localhost:8088/products`)
        .then((response) => response.json())
        .then((data) => {
          const filteredResults = data.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error(error);
          setIsSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate('/search');
  };

  return (
    <div className="search-form">
      <h2>Search</h2>
      <Link to="/" className="close-link">X</Link>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter name of candy"
        />
        <button type="submit">Search</button>
      </form>
      {/* Render the search results */}
      {isSearching ? (
        <p>Loading...</p>
      ) : (
        <div>
          {searchQuery === '' ? null : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li key={product.id}>{product.name} - Price: ${product.price}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';

function StreamList() {
  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);

  const handleAddMovie = () => {
    if (movie.trim()) {
      setMovies([...movies, movie]);
      setMovie('');
    }
  };

  return (
    <div className="streamlist-container">
      <h1>StreamList</h1>
      <input
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Add a movie..."
      />
      <button onClick={handleAddMovie}>Add Movie</button>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;

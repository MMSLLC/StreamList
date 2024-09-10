import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function StreamList() {
  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (movie.trim()) {
      if (isEditing) {
        const updatedMovies = [...movies];
        updatedMovies[currentIndex] = movie;
        setMovies(updatedMovies);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setMovies([...movies, movie]);
      }
      setMovie('');
    }
  };

  const handleEditMovie = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setMovie(movies[index]);
  };

  const handleDeleteMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
    if (isEditing && index === currentIndex) {
      setIsEditing(false);
      setMovie('');
    }
  };

  return (
    <div className="streamlist-container">
      <h1>StreamList</h1>
      <form onSubmit={handleAddMovie}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Add a movie..."
        />
        <button type="submit">{isEditing ? 'Update Movie' : 'Add Movie'}</button>
      </form>
      {movies.length === 0 ? (
        <p>No movies in your list. Start adding some!</p>
      ) : (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              {movie}
              <button onClick={() => handleEditMovie(index)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button onClick={() => handleDeleteMovie(index)}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StreamList;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function StreamList() {
  // State variables for managing movies, editing, and watched movies
  const [movie, setMovie] = useState(''); // Input field state
  const [movies, setMovies] = useState([]); // List of movies
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const [currentIndex, setCurrentIndex] = useState(null); // Current movie index being edited
  const [watchedMovies, setWatchedMovies] = useState([]); // List of watched movies

  // Function to add or update a movie
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (movie.trim()) {
      if (isEditing) {
        // Update existing movie
        const updatedMovies = [...movies];
        updatedMovies[currentIndex] = movie;
        setMovies(updatedMovies);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        // Add new movie to the list
        setMovies([...movies, movie]);
      }
      setMovie(''); // Clear input after adding or updating
    }
  };

  // Function to handle editing a movie
  const handleEditMovie = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setMovie(movies[index]); // Set the movie to be edited in the input field
  };

  // Function to handle deleting a movie
  const handleDeleteMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index)); // Remove the selected movie
    if (isEditing && index === currentIndex) {
      setIsEditing(false);
      setMovie(''); // Reset input if the currently edited movie is deleted
    }
  };

  // Function to handle marking a movie as watched
  const handleCompleteMovie = (index) => {
    const watchedMovie = movies[index];
    if (!watchedMovies.includes(watchedMovie)) {
      setWatchedMovies([...watchedMovies, watchedMovie]);
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
            <li key={index} className={watchedMovies.includes(movie) ? 'watched' : ''}>
              {movie}
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEditMovie(index)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteMovie(index)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button className="complete-btn" onClick={() => handleCompleteMovie(index)}>
                  <FontAwesomeIcon icon={faCheckCircle} /> Watch
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StreamList;

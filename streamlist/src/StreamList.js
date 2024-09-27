import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function StreamList() {
  const [movie, setMovie] = useState(''); 
  const [movies, setMovies] = useState(() => {
    
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(null); 
  const [watchedMovies, setWatchedMovies] = useState(() => {
   
    const savedWatched = localStorage.getItem('watchedMovies');
    return savedWatched ? JSON.parse(savedWatched) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

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

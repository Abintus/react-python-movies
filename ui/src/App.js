import './App.css';
import {useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import {useEffect} from "react";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);

    useEffect(() => {
    const fetchMovies = async () => {
        const response = await fetch(`/movies`);
        if (response.ok) {
            const movies = await response.json();
            setMovies(movies);
        }
    };
    fetchMovies();
    }, []);

    async function handleAddMovie(movie) {
          if(movie.year == ""){ alert("Year must not be empty!")} else {
              if (parseInt(movie.year) > 0) {
                  movie.year = parseInt(movie.year);
                  const response = await fetch('/movies', {
                      method: 'POST',
                      body: JSON.stringify(movie),
                      headers: {'Content-Type': 'application/json'}
                  });
                  if (response.ok) {
                      const newMovie = await response.json();
                      setMovies([...movies, newMovie]);
                      setAddingMovie(false);
                  }
              } else {
                  alert("Year must be a number!")
              }
          }
    }

    async function handleDropMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
        method: 'DELETE',
        });
        if (response.ok) {
            setMovies(movies.filter(m => m !== movie))
        }
    }

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie= {(movie) => handleDropMovie(movie)}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
        </div>
    );
}

export default App;

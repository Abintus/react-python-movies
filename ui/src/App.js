import './App.css';
import {useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import {useEffect} from "react";
import ActorForm from "./ActorForm";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [actors, setActors] = useState([])
    const [addingActor, setAddingActor] = useState(false);

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

    useEffect(() => {
        const fetchActors = async () => {
        const response = await fetch("/actors");
        if (response.ok) {
            const actors = await response.json();
            setActors(actors);
        }
    };
    fetchActors();
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

    async function handleAddActor(actor) {
        if(actor.name == '' || actor.surname == ''){ alert("Both name and surname must be filled in!")}
        else {
            const response = await fetch('/actors', {
                method: 'POST',
                body: JSON.stringify(actor),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                const newActor = await response.json();
                setMovies([...actors, newActor]);
                setAddingActor(false);
            }
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
                ? <MovieForm actors={actors} onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
            {addingActor
                ? <ActorForm onActorSubmit={handleAddActor}
                             buttonLabel="Add an actor"
                />
                : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
        </div>
    );
}

export default App;

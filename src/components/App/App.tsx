import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';


function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);
    try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast("No movies found for your request.");
      }

      setMovies(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally { setLoading(false)}
  };

  return (
    <>
      {selectedMovie && (<MovieModal
        movie={selectedMovie}
      onClose={()=>setSelectedMovie(null)}/>)}
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (<MovieGrid
        movies={movies}
      onSelect={(movie) => setSelectedMovie(movie)}/>) }
      

      <Toaster />

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App

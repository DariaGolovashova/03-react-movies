import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse { 
    results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
        params: {
            query: query,
        },
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    }
    );
    return response.data.results;
};
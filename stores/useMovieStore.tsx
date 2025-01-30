import { fetchMovies, GetFavMovies, GetToWatchMovies, Movie } from '@/app/ApiService';
import { create } from 'zustand';

interface MovieStoreState {
    movies: Movie[];
    favMovies: Movie[];
    toWatchMovies: Movie[];
    moviesLoading: boolean;
    favMoviesLoading: boolean;
    toWatchLoading: boolean;
    fetchMovies: () => Promise<void>;
    toggleFavorite: (movie: Movie) => void;
}

const useMovieStore = create<MovieStoreState>((set) => ({
    movies: [],
    favMovies: [],
    toWatchMovies: [],
    moviesLoading: true,
    favMoviesLoading: true,
    toWatchLoading: true,

    fetchMovies: async () => {
        try {
            const fetchedMovies = await fetchMovies();
            const fetchedFavMovies = await GetFavMovies();
            const fetchedToWatchedMovies = await GetToWatchMovies();

            set({
                movies: fetchedMovies,
                favMovies: fetchedFavMovies,
                toWatchMovies: fetchedToWatchedMovies,
                moviesLoading: false,
                favMoviesLoading: false, 
                toWatchLoading: false, 
            });
            
        } catch (error) {
            console.error("Error fetching movies: ", error);
            set({ moviesLoading: false, favMoviesLoading: false, toWatchLoading: false });
        }
    },

    toggleFavorite: (movie: Movie) => set((state) => {
        const isFavorite = state.favMovies.some((m) => m.id === movie.id);
        const updatedFavMovies = isFavorite ? state.favMovies.filter((m) => m.id !== movie.id) : [...state.favMovies, movie];

        return { favMovies: updatedFavMovies };
    }),

    toggleWatchlist: (movie: Movie) => set((state) => {
        const isInWatchlist = state.toWatchMovies.some((m) => m.id === movie.id);
        const updatedToWatchMovies = isInWatchlist
          ? state.toWatchMovies.filter((m) => m.id !== movie.id)
          : [...state.toWatchMovies, movie];
    
        return { toWatchMovies: updatedToWatchMovies };
      }),
}));

export default useMovieStore;
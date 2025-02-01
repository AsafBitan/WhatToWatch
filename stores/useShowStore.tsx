import { fetchTV, GetFavShows, GetToWatchShows, TVShow } from '@/app/ApiService';
import { create } from 'zustand';

interface ShowStoreState {
    shows: TVShow[];
    favShows: TVShow[];
    toWatchShows: TVShow[];
    ShowsLoading: boolean;
    favShowsLoading: boolean;
    toWatchShowsLoading: boolean;
    getShows: () => Promise<void>;
    toggleShowFavorite: (show: TVShow) => void;
    toggleShowWatchlist: (show: TVShow) => void;
}

const useShowStore = create<ShowStoreState>((set) => ({
    shows: [],
    favShows: [],
    toWatchShows: [],
    ShowsLoading: true,
    favShowsLoading: true,
    toWatchShowsLoading: true,

    getShows: async () => {
        try {
            const fetchedShows = await fetchTV();
            const fetchedFavShows = await GetFavShows();
            const fetchedToWatchShows = await GetToWatchShows();

            set({
                shows: fetchedShows,
                favShows: fetchedFavShows,
                toWatchShows: fetchedToWatchShows,
                ShowsLoading: false,
                favShowsLoading: false, 
                toWatchShowsLoading: false, 
            });
            
        } catch (error) {
            console.error("Error fetching shows: ", error);
            set({ ShowsLoading: false, favShowsLoading: false, toWatchShowsLoading: false });
        }
    },

    toggleShowFavorite: (shows: TVShow) => set((state) => {
        const isFavorite = state.favShows.some((s) => s.id === shows.id);
        const updatedFavShows = isFavorite ? state.favShows.filter((s) => s.id !== shows.id) : [...state.favShows, shows];

        return { favShows: updatedFavShows };
    }),

    toggleShowWatchlist: (shows: TVShow) => set((state) => {
        const isInWatchlist = state.toWatchShows.some((s) => s.id === shows.id);
        const updatedToWatchShows = isInWatchlist
          ? state.toWatchShows.filter((s) => s.id !== shows.id)
          : [...state.toWatchShows, shows];
    
        return { toWatchShows: updatedToWatchShows };
      }),
}));

export default useShowStore;
import React from "react";
import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const ip = process.env.EXPO_PUBLIC_IP;

if (!apiKey) {
  console.error("API Key is not defined");
  throw new Error("Missing API Key");
}

const FAV_MOVIE_MONGO_URL = `http://${ip}:3000/api/movies`;
const FAV_SHOW_MONGO_URL = `http://${ip}:3000/api/shows`;
const TO_WATCH_MOVIE_MONGO_URL = `http://${ip}:3000/api/toWatchMovies`;
const TO_WATCH_SHOW_MONGO_URL = `http://${ip}:3000/api/toWatchShows`;

interface Genres {
  id: number;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  media_type: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genres: Genres[];
  overview: string;
}

export const transformMovieData = (movieData: any): Movie => {
  return {
    id: movieData.id,
    title: movieData.title,
    media_type: "movie",
    poster_path: movieData.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
      : null,
    vote_average: movieData.vote_average,
    release_date: movieData.release_date,
    genres: movieData.genres || [],
    overview: movieData.overview,
  };
};

export interface TVShow {
  id: string;
  title: string;
  media_type: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genres: Genres[];
  overview: string;
}

export const transformTvShowData = (TvShoweData: any): TVShow => {
  return {
    id: TvShoweData.id,
    title: TvShoweData.name,
    media_type: "tvshow",
    poster_path: TvShoweData.poster_path
      ? `https://image.tmdb.org/t/p/w500${TvShoweData.poster_path}`
      : null,
    vote_average: TvShoweData.vote_average,
    release_date: TvShoweData.release_date,
    genres: TvShoweData.genres || [],
    overview: TvShoweData.overview,
  };
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const movie = response.data.results || [];
    return movie.map(transformMovieData);
  } catch (error) {
    console.error("Error fetching movies", error);
    throw error;
  }
};

export const fetchTV = async (): Promise<TVShow[]> => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const shows = response.data.results || [];
    return shows.map(transformTvShowData);
  } catch (error) {
    console.error("Error fetching tv shows", error);
    throw error;
  }
};

export const fetchMovieByID = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const movie = response.data || null;
    return transformMovieData(movie);
  } catch (error) {
    console.error("Error fetching by id ", error);
    throw error;
  }
};

export const fetchTVShowByID = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const show = response.data || null;
    return transformTvShowData(show);
  } catch (error) {
    console.error("Error fetching by id ", error);
    throw error;
  }
};

export const GetFavMovies = async (): Promise<Movie[]> => {
  const url = FAV_MOVIE_MONGO_URL;
  try {
    const response = await axios.get(url);
    const movie = response.data || null;
    console.log("Raw movie response data:", response.data);
    return movie.map(transformMovieData);
  } catch (error) {
    console.error("Error getting favorite movie", error);
    throw error;
  }
};

export const GetFavShows = async (): Promise<TVShow[]> => {
  const url = FAV_SHOW_MONGO_URL;
  try {
    const response = await axios.get(url);
    const show = response.data || null;
    console.log("Raw show response data:", response.data);
    return show?.map(transformTvShowData);
  } catch (error) {
    console.error("Error getting favorite show", error);
    throw error;
  }
};

export const addFavMovie = async (movie: Movie): Promise<Movie> => {
  try {
    console.log("sending moivie:", movie);
    const response = await axios.post(FAV_MOVIE_MONGO_URL, movie);
    console.log("Movie added to favorites:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding movie to favorits", error);
    throw error;
  }
};

export const removeFavMovie = async (movie: Movie): Promise<Movie> => {
  try {
    console.log("Removing movie with ID:", movie.id);
    const response = await axios.delete(`${FAV_MOVIE_MONGO_URL}/${movie.id}`);
    console.log("Movie deleted from favorites:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie from favorits", error);
    throw error;
  }
};

export const addFavShow = async (show: TVShow): Promise<TVShow> => {
  try {
    console.log("sending show:", show);
    const response = await axios.post(FAV_SHOW_MONGO_URL, show);
    console.log("Show added to favorites:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding show to favorits", error);
    throw error;
  }
};

export const removeFavShow = async (show: TVShow): Promise<TVShow> => {
  try {
    console.log("deleting show:", show);
    const response = await axios.delete(`${FAV_SHOW_MONGO_URL}/${show.id}`);
    console.log("Show deleted from favorites:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting show from favorits", error);
    throw error;
  }
};

export const GetToWatchMovies = async (): Promise<Movie[]> => {
  const url = TO_WATCH_MOVIE_MONGO_URL;
  try {
    const response = await axios.get(url);
    const movie = response.data || null;
    console.log("Raw movie response data:", response.data);
    return movie.map(transformMovieData);
  } catch (error) {
    console.error("Error getting want to watch movie", error);
    throw error;
  }
};

export const GetToWatchShows = async (): Promise<TVShow[]> => {
  const url = TO_WATCH_SHOW_MONGO_URL;
  try {
    const response = await axios.get(url);
    const show = response.data || null;
    console.log("Raw show response data:", response.data);
    return show?.map(transformTvShowData);
  } catch (error) {
    console.error("Error getting to want to watch show", error);
    throw error;
  }
};

export const addToWatchMovie = async (movie: Movie): Promise<Movie> => {
  const url = TO_WATCH_MOVIE_MONGO_URL;
  try {
    console.log("sending moivie:", movie);
    const response = await axios.post(url, movie);
    console.log("Movie added to want to watch:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding movie to want to watch", error);
    throw error;
  }
};

export const removeToWatchMovie = async (movie: Movie): Promise<Movie> => {
  try {
    console.log("Removing movie with ID:", movie.id);
    const response = await axios.delete(`${TO_WATCH_MOVIE_MONGO_URL}/${movie.id}`);
    console.log("Movie deleted from favorites:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie from want to watch", error);
    throw error;
  }
};

export const addToWatchShow = async (show: TVShow): Promise<TVShow> => {
  const url = TO_WATCH_SHOW_MONGO_URL;
  try {
    console.log("sending show:", show);
    const response = await axios.post(url, show);
    console.log("Show added to want to watch:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding show to want to watch", error);
    throw error;
  }
};

export const removeToWatchShow = async (show: TVShow): Promise<TVShow> => {
  const url = TO_WATCH_SHOW_MONGO_URL;
  try {
    console.log("removing show:", show);
    const response = await axios.delete(`${url}/${show.id}`);
    console.log("Show deleted from want to watch:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting show from want to watch", error);
    throw error;
  }
};

export const findMulti = async (query: string): Promise<(Movie | TVShow)[]> => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
  try {
    console.log("sending search for: ", query);
    const response = await axios.get(url);
    const searchResults = response.data.results || [];
    console.log('Response is: ', searchResults)
    return searchResults.map((item: any) => item.media_type == "movie" ? transformMovieData(item) : transformTvShowData(item))
  } catch (error) {
    console.error(`Error searching for the query: ${query}`, error);
    throw error;
  }
};

const ApiService = {
  fetchMovies,
  fetchTV,
  fetchMovieByID,
  fetchTVShowByID,
  GetFavMovies,
  GetFavShows,
  addFavMovie,
  addFavShow,
  GetToWatchMovies,
  GetToWatchShows,
  addToWatchMovie,
  addToWatchShow,
};

export default ApiService;

import React from "react";
import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const ip = process.env.EXPO_PUBLIC_IP

if (!apiKey) {
  console.error("API Key is not defined");
  throw new Error("Missing API Key");
}

const FAV_MOVIE_MONGO_URL = `http://${ip}:3000/api/movies`;
const FAV_SHOW_MONGO_URL = `http://${ip}:3000/api/shows`;

interface Genres {
  id: number;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  type: string;
  primaryImage: string | null;
  averageRating: number;
  releaseDate: string;
  genres: Genres[];
  description: string;
}

const transformMovieData = (movieData: any): Movie => {
  return {
    id: movieData.id,
    title: movieData.title,
    type: "movie",
    primaryImage: movieData.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
      : null,
    averageRating: movieData.vote_average,
    releaseDate: movieData.release_date,
    genres: movieData.genres || [],
    description: movieData.overview,
  };
};

export interface TVShow {
  id: string;
  title: string;
  type: string;
  primaryImage: string | null;
  averageRating: number;
  releaseDate: string;
  genres: Genres[];
  description: string;
}

const transformTvShoweData = (TvShoweData: any): Movie => {
  return {
    id: TvShoweData.id,
    title: TvShoweData.name,
    type: "Tv show",
    primaryImage: TvShoweData.poster_path
      ? `https://image.tmdb.org/t/p/w500${TvShoweData.poster_path}`
      : null,
    averageRating: TvShoweData.vote_average,
    releaseDate: TvShoweData.first_air_date,
    genres: TvShoweData.genres || [],
    description: TvShoweData.overview,
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
    return shows.map(transformTvShoweData);
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
    return transformTvShoweData(show);
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
    return show.map(transformTvShoweData);
  } catch (error) {
    console.error("Error getting favorite show", error);
    throw error;
  }
};

export const addFavMovie = async (movie: Movie): Promise<Movie> => {
  try {
    console.log("sending moivie:", movie);
    const response = await axios.post(FAV_MOVIE_MONGO_URL, movie)
    console.log("Movie added to favorites:", response.data);
    return response.data
  } catch (error) {
    console.error('Error adding movie to favorits', error)
    throw error
  }
}

export const addFavShow = async (show: TVShow): Promise<TVShow> => {
  try {
    const response = await axios.post(FAV_SHOW_MONGO_URL, show)
    return response.data
  } catch (error) {
    console.error('Error adding show to favorits', error)
    throw error
  }
}

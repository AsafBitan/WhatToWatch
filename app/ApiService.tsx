import React from 'react';
import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY

if (!apiKey) {
  console.error('API Key is not defined');
  throw new Error('Missing API Key');
}

export interface Movie {
  id: string;
  title: string;
  type: string;
  primaryImage: string | null;
  averageRating: number;
  releaseDate: string;
  genres: string[];
  description: string;
}

const transformMovieData = (movieData: any): Movie => {
  return {
    id: movieData.id,
    title: movieData.title,
    type: 'movie',
    primaryImage: movieData.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
      : null,
    averageRating: movieData.vote_average,
    releaseDate: movieData.release_date,
    genres: movieData.genre_ids || [], 
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
  genres: string[];
  description: string;
}

const transformTvShoweData = (TvShoweData: any): Movie => {
  return {
    id: TvShoweData.id,
    title: TvShoweData.name,
    type: 'Tv show',
    primaryImage: TvShoweData.poster_path
      ? `https://image.tmdb.org/t/p/w500${TvShoweData.poster_path}`
      : null,
    averageRating: TvShoweData.vote_average,
    releaseDate: TvShoweData.first_air_date,
    genres: TvShoweData.genre_ids || [], 
    description: TvShoweData.overview,
  };
};


const baseOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  };

export const fetchMovies = async (): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
  try {
    const response = await axios.get(url);
    const movie = response.data.results || [];
    return movie.map(transformMovieData)
  } catch (error) {
      console.error('Error fetching movies', error);
      throw error;
  }
}

export const fetchTV = async (): Promise<TVShow[]> => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
  try {
    const response = await axios.get(url, baseOptions);
    const shows = response.data.results || [];
    return shows.map(transformTvShoweData)
  } catch (error) {
      console.error('Error fetching tv shows', error);
      throw error;
  }
}

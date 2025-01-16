import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { fetchMovieByID, Movie } from '@/app/ApiService';

const MoviePage = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchMovie = async () => {
        if (id) {
          const fetchedMovieById = await fetchMovieByID(id);
          setMovie(fetchedMovieById);
          console.log(movie);
        }
        setLoading(false);
      };
      fetchMovie();
    }, [id]);

  return (
    <View>
      <Text>{loading ? (<ActivityIndicator/>) : id}</Text>
    </View>
  )
}

export default MoviePage
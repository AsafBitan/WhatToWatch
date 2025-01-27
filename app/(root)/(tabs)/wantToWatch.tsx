import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GetToWatchMovies,
  GetToWatchShows,
  Movie,
  TVShow,
} from "@/app/ApiService";
import { MovieCards, TVShowCards } from "@/components/Cards";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const wantToWatch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<TVShow[]>([]);

  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingShow, setLoadingShow] = useState(true);

  const handleMoviePress = (id: string) => router.push(`/movie/${id}`);
  const handleTVSowPress = (id: string) => router.push(`/tvshow/${id}`);

  const fetchToWatchMovies = async () => {
    try {
      const toWatchMovies = await GetToWatchMovies();
      setMovies(toWatchMovies);
    } catch (error) {
      console.error("Error fetching to watch movies: ", error);
    } finally {
      setLoadingMovie(false);
    }
  };

  const fetchToWatchShows = async () => {
    try {
      const toWatchShows = await GetToWatchShows();
      setShows(toWatchShows);
    } catch (error) {
      console.error("Error fetching to watch shows: ", error);
    } finally {
      setLoadingShow(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchToWatchMovies();
      fetchToWatchShows();
    }, [])
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View className="mt-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Movies
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold txt-primary-300">
                see more
              </Text>
            </TouchableOpacity>
          </View>

          {loadingMovie ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MovieCards
                  item={item}
                  onPress={() => handleMoviePress(item.id)}
                />
              )}
              horizontal
              contentContainerClassName="flex mt-3"
            />
          )}
        </View>

        <View className="mt-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Shows
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold txt-primary-300">
                see more
              </Text>
            </TouchableOpacity>
          </View>
          {loadingShow ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={shows}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TVShowCards
                  item={item}
                  onPress={() => handleTVSowPress(item.id)}
                />
              )}
              horizontal
              contentContainerClassName="flex mt-3"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default wantToWatch;

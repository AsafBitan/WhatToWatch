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
import useMovieStore from "@/stores/useMovieStore";
import useShowStore from "@/stores/useShowStore";

const wantToWatch = () => {
  const {
    favMovies,
    toWatchMovies,
    toWatchLoading,
  } = useMovieStore();

  const {
    favShows,
    toWatchShows,
    toWatchShowsLoading,
  } = useShowStore();

  const handleMoviePress = (id: string) => router.push(`/movie/${id}`);
  const handleTVSowPress = (id: string) => router.push(`/tvshow/${id}`);

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

          {toWatchLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={toWatchMovies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MovieCards
                  item={item}
                  onPress={() => handleMoviePress(item.id)}
                  isFavorite={favMovies.some((movie) => movie.id === item.id)}
                  isWatchList={true}
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
          {toWatchShowsLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={toWatchShows}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TVShowCards
                  item={item}
                  onPress={() => handleTVSowPress(item.id)}
                  isFavorite={favShows.some((show) => show.id === item.id)}
                  isWatchList={true}
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

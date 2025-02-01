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
import { GetFavMovies, GetFavShows, Movie, TVShow } from "@/app/ApiService";
import { MovieCards, TVShowCards } from "@/components/Cards";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import useMovieStore from "@/stores/useMovieStore"
import useShowStore from "@/stores/useShowStore";

const Favorites = () => {
  const {
    favMovies,
    toWatchMovies,
    favMoviesLoading,
  } = useMovieStore();

  const {
    favShows,
    toWatchShows,
    favShowsLoading,
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

          {favMoviesLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={favMovies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MovieCards
                  item={item}
                  onPress={() => handleMoviePress(item.id)}
                  isFavorite={true}
                  isWatchList={toWatchMovies.some(
                    (movie) => movie.id === item.id
                  )}
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
          {favShowsLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={favShows}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TVShowCards
                  item={item}
                  onPress={() => handleTVSowPress(item.id)}
                  isFavorite={true}
                  isWatchList={toWatchShows.some(
                    (show) => show.id === item.id
                  )}
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

// return (
//   <SafeAreaView className='h-full bg-white'>
//       <View>
//         <View className="flex flex-row items-center justify-between">
//           <Text className="text-xl font-rubik-bold text-black-300">
//             Movies
//           </Text>
//           <TouchableOpacity>
//             <Text className="text-base font-rubik-bold txt-primary-300">
//               see more
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {loadingMovie ? (
//           <ActivityIndicator size="large" color="#000" />
//         ) : (
//           <FlatList
//             data={movies}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <MovieCards
//                 item={item}
//                 onPress={() => handleMoviePress(item.id)}
//               />
//             )}
//             contentContainerClassName="flex mt-3"
//             numColumns={3}
//           />
//         )}
//       </View>

//       <View className="mt-5">
//         <View className="flex flex-row items-center justify-between">
//           <Text className="text-xl font-rubik-bold text-black-300">
//             Shows
//           </Text>
//           <TouchableOpacity>
//             <Text className="text-base font-rubik-bold txt-primary-300">
//               see more
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {loadingShow ? (
//           <ActivityIndicator size="large" color="#000" />
//         ) : (
//           <FlatList
//             data={shows}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TVShowCards
//                 item={item}
//                 onPress={() => handleTVSowPress(item.id)}
//               />
//             )}
//             contentContainerClassName="flex mt-3"
//           />
//         )}
//       </View>
//   </SafeAreaView>
// )
// }

export default Favorites;

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

const Favorites = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<TVShow[]>([]);

  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingShow, setLoadingShow] = useState(true);

  const handleMoviePress = (id: string) => router.push(`/movie/${id}`);
  const handleTVSowPress = (id: string) => router.push(`/tvshow/${id}`);

  const fetchFavMovies = async () => {
    try {
      const favMovies = await GetFavMovies();
      setMovies(favMovies);
      console.log(favMovies);
    } catch (error) {
      console.error("Error fetching favorit movies: ", error);
    } finally {
      setLoadingMovie(false);
    }
  };

  const fetchFavShows = async () => {
    try {
      const favShows = await GetFavShows();
      setShows(favShows);
    } catch (error) {
      console.error("Error fetching favorit shows: ", error);
    } finally {
      setLoadingShow(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavMovies();
      fetchFavShows();
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

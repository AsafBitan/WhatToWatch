import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  removeFavMovie,
  removeToWatchMovie,
  removeFavShow,
  removeToWatchShow,
  addFavMovie,
  addFavShow,
  addToWatchMovie,
  addToWatchShow,
  Movie,
  TVShow,
} from "../app/ApiService";

import icons from "@/constants/icons";
import useMovieStore from "@/stores/useMovieStore";
import useShowStore from "@/stores/useShowStore";

interface MovieProps {
  item: Movie;
  onPress?: () => void;
  isFavorite: boolean;
  isWatchList: boolean;
}

interface TVShowProps {
  item: TVShow;
  onPress?: () => void;
  isFavorite: boolean;
  isWatchList: boolean;
}



const handleMovieLikePress = (movie: Movie, isFavorite: boolean) => {
  if (isFavorite){
    removeFavMovie(movie);
  } else{
    addFavMovie(movie);
  }
  console.log("is favorite: ",isFavorite)
};

const handleShowLikePress = (show: TVShow, isFavorite: boolean) => {
  console.log("isFavorite: ", isFavorite);
  if (isFavorite){
    removeFavShow(show)
  } else{
    addFavShow(show);
  }
  console.log("is favorite: ",isFavorite)
};

const handleMovieToWatchPress = (movie: Movie, isInWatchlist: boolean) => {
  if (isInWatchlist){
    removeToWatchMovie(movie)
  } else {
    addToWatchMovie(movie);
  }
};

const handleShowToWatchPress = (show: TVShow, isInWatchlist: boolean) => {
  if (isInWatchlist){
    removeToWatchShow(show)
  }else{
    addToWatchShow(show);
  }
};

export const MovieCards = ({ item, onPress, isFavorite, isWatchList }: MovieProps) => {
  
  const {
    toggleMovieFavorite,
    toggleMovieWatchlist,
  } = useMovieStore();

  return (
    <View className="flex flex-row flex-wrap justify-center mb-3">
      <TouchableOpacity
        key={item.id}
        onPress={onPress}
        className="flex flex-col w-60 items-center"
      >
        <View className="w-full h-80 rounded-2xl overflow-hidden shadow-lg relative">
          {item.poster_path ? (
            <Image
              source={{ uri: item.poster_path }}
              className="size-full rounded-2xl"
              resizeMode="contain"
            />
          ) : (
            <View className="size-full bg-gray-300 rounded-2xl" />
          )}
          <View className="flex flex-row items-center bg-white/70 px-3 py-1.5 rounded-full absolute top-5 right-5">
            <Text className="text-xs font-bold text-black">
              {item.vote_average?.toFixed(1)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => { handleMovieLikePress(item, isFavorite); toggleMovieFavorite(item); }}
            className="flex flex-row items-center bg-white/70 rounded-full px-1 py-1 absolute top-14 right-5 "
          >
            <Image source={icons.like} style={{ width: 20, height: 20, tintColor: isFavorite ? "red" : "black"}} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {handleMovieToWatchPress(item, isWatchList); toggleMovieWatchlist(item)}}
            className="flex flex-row items-center bg-white/70 rounded-full px-1 py-1 absolute top-24 right-5"
          >
            <Image source={icons.time} style={{ width: 20, height: 20, tintColor: isWatchList ? "red" : "black" }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-base font-bold text-black text-center">
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const TVShowCards = ({ item, onPress, isFavorite, isWatchList }: TVShowProps) => {

  const {
    toggleShowFavorite,
    toggleShowWatchlist,
  } = useShowStore();

  return (
    <View className="flex flex-row flex-wrap justify-center mt-3">
      <TouchableOpacity
        key={item.id}
        onPress={onPress}
        className="flex flex-col w-60 items-center"
      >
        <View className="w-full h-80 rounded-2xl overflow-hidden shadow-lg relative">
          {item.poster_path ? (
            <Image
              source={{ uri: item.poster_path }}
              className="size-full rounded-2xl"
              resizeMode="contain"
            />
          ) : (
            <View className="size-full bg-gray-300 rounded-2xl" />
          )}
          <View className="flex flex-row item-center bg-white/70 px-3 py-1.5 rounded-full absolute top-5 right-5">
            <Text className="text-xs font-bold text-black">
              {item.vote_average?.toFixed(1)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {handleShowLikePress(item, isFavorite); toggleShowFavorite(item)}}
            className="flex flex-row items-center bg-white/70 rounded-full px-1 py-1 absolute top-14 right-5 "
          >
            <Image
              source={icons.like}
              style={{ width: 20, height: 20, tintColor: isFavorite ? "red" : "black"}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {handleShowToWatchPress(item, isWatchList); toggleShowWatchlist(item)}}
            className="flex flex-row items-center bg-white/70 rounded-full px-1 py-1 absolute top-24 right-5"
          >
            <Image source={icons.time} style={{ width: 20, height: 20, tintColor: isWatchList ? "red" : "black" }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-base font-bold text-black text-center">
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// export const TVShowCards = ({ tvshows }: TVShows) => {
//     return (
//         <View className='flex flex-row flex-wrap justify-center mt-3'>
//         {tvshows.map((show) => (
//             <TouchableOpacity key={show.id} className='flex flex-col w-40 h-60 m-2 relative rounded-xl justify-center'>
//                 {show.primaryImage ? (
//                     <Image source={{ uri: show.primaryImage }} className='w-full h-full rounded-2xl'/>
//                 ) : (
//                     <View className='w-full h-full bg-gray-300 rounded-2xl'/>
//                 )}
//                 <View className='absolute top-2 right-1 bg-white/90 px-1 rounded-full'>
//                     <Text className='text-ex font-bold text-black'>{show.averageRating.toFixed(1)}</Text>
//                 </View>
//                 <Text className='flex relative text-sm font-medium text-black text-center'>{show.title}</Text>
//             </TouchableOpacity>
//         ))
//         }
//     </View>
//     )
// }

// export const MovieCards = ({ movies }: Movies) => {
//     return (
//         <View className="flex flex-row flex-wrap justify-center">
//             {movies.map((movie) => (
//                 <TouchableOpacity
//                     key={movie.id}
//                     className="flex flex-col w-60 h-80 items-start relative rounded-xl"
//                 >
//                     {movie.primaryImage ? (
//                         <Image
//                             source={{ uri: movie.primaryImage }}
//                             className="size-full rounded-2xl"
//                             resizeMode="contain"
//                         />
//                     ) : (
//                         <View className="w-full h-full bg-gray-300 rounded-2xl" />
//                     )}
//                     <View className="flex flex-row item-center bg-white/90 px-3 py-1.5 rounded-full abolute top-5 right-5">
//                         <Text className="text-xs font-bold text-black">
//                             {movie.averageRating.toFixed(1)}
//                         </Text>
//                     </View>
//                     <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
//                         <Text className="text-sm font-medium-extrabold text-black text-center">
//                             {movie.title}
//                         </Text>
//                     </View>

//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

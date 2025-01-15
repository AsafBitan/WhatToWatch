import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import { Movie, TVShow } from '../app/ApiService';

interface Movies {
    movies: Movie[];
}

interface TVShows {
    tvshows: TVShow[];
}

export const MovieCards: React.FC<Movies> = ({ movies }: Movies) => {
    return (
        <View className="flex flex-row flex-wrap justify-center mt-1">
            {movies.map((movie) => (
                <TouchableOpacity
                    key={movie.id}
                    className="flex flex-col w-40 h-80 m-1 relative rounded-xl"
                >
                    {movie.primaryImage ? (
                        <Image
                            source={{ uri: movie.primaryImage }}
                            className="w-full h-full rounded-2xl"
                            resizeMode="contain"
                        />
                    ) : (
                        <View className="w-full h-full bg-gray-300 rounded-2xl" />
                    )}
                    <View className="absolute top-3 right-1 bg-white/90 px-1 rounded-full">
                        <Text className="text-ex font-bold text-black">
                            {movie.averageRating.toFixed(1)}
                        </Text>
                    </View>
                    <View className="h-16 justify-end px-2 py-2">  
                        <Text className="text-sm font-medium text-black text-center">
                            {movie.title}
                        </Text>
                    </View>
                    
                </TouchableOpacity>
            ))}
        </View>
    );
};
//testing testing
export const TVShowCards: React.FC<TVShows> = ({ tvshows }: TVShows) => {
    return (
        <View className='flex flex-row flex-wrap justify-center mt-3'>
        {tvshows.map((show) => (
            <TouchableOpacity key={show.id} className='flex flex-col w-40 h-60 m-2 relative rounded-xl justify-center'>
                {show.primaryImage ? (
                    <Image source={{ uri: show.primaryImage }} className='w-full h-full rounded-2xl'/>
                ) : (
                    <View className='w-full h-full bg-gray-300 rounded-2xl'/>
                )}
                <View className='absolute top-2 right-1 bg-white/90 px-1 rounded-full'>
                    <Text className='text-ex font-bold text-black'>{show.averageRating.toFixed(1)}</Text>
                </View>
                <Text className='flex relative text-sm font-medium text-black text-center'>{show.title}</Text>
            </TouchableOpacity>
        ))
        }
    </View>
    )
}
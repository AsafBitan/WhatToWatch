import React, { useState, useEffect} from "react";
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/seatch";
import { MovieCards, TVShowCards } from "@/components/Cards";

import { Movie, TVShow, fetchMovies, fetchTV } from "../../ApiService";


const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [tvshows, setTvshows] = useState<TVShow[]>([])
 
  useEffect(() => {
    const getMovies = async () => {
      try{
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      }catch(error){
        console.error('Error fetching movies: ', error)
      }finally{
        setLoading(false);
      }
    } 
    const getTvShows = async () => {
      try{
        const fetchedTvshows = await fetchTV();
        setTvshows(fetchedTvshows)
      }catch(error){
        console.error('Error fetching movies: ', error)
      }finally{
        setLoading(false);
      }
    } 
    getMovies();
    getTvShows();
  }, [])
  

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
           
        </View>
        <Search />
        <View className="my-5">
          <View className="flex flex-row items-center justify-betweeen">
            
          </View>
        </View>
      </View>
      <View>
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
        
        {
        loading ? (
          <ActivityIndicator size='large' color='#000' />
        ) : (
          <FlatList 
          data={movies} 
          keyExtractor={(item) => item.id} 
          renderItem={({item}) => <MovieCards movies={[item]}/>} 
          horizontal
          contentContainerClassName="flex mt-3"
          />
        )
       }
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
        {
          loading ? (
            <ActivityIndicator size='large' color='#000'/>
            ) : (
              <FlatList 
              data={tvshows}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <TVShowCards tvshows={[item]}/>}
              horizontal
              contentContainerClassName="flex mt-3"
              />
            )
        } 
      </View>
      
    </SafeAreaView>
  );
};
export default Home;
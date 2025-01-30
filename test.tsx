
// const Home = () => {
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [favMovies, setFavMovies] = useState<Movie[]>([]);
//     const [toWatchMovies, setToWatchMovies] = useState<Movie[]>([]);
//     const [loadingMovie, setLoadingMovie] = useState(true);
  
//     const [tvshows, setTvshows] = useState<TVShow[]>([]);const { movies, favMovies, toWatchMovies, fetchMovies, loading } = useMovieStore();
//     const [loadingShow, setLoadingShow] = useState(true);
  
//     const handleMoviePress = (id: string) => router.push(`/movie/${id}`);
//     const handleTVSowPress = (id: string) => router.push(`/tvshow/${id}`);
  
//     const handleNavigateToExplore = (query: string) => {
//       router.push({
//         pathname: "/explore",
//         params: {
//           query,
//         },
//       });
//     };
  
//     useEffect(() => {
//       const getMovies = async () => {
//         try {
//           const fetchedMovies = await fetchMovies();
//           setMovies(fetchedMovies);
//           const fetchedFavMovies = await GetFavMovies()
//           setFavMovies(fetchedFavMovies)
//           const fetchedToWatchedMovies = await GetToWatchMovies()
//           setToWatchMovies(fetchedToWatchedMovies)
  
//         } catch (error) {
//           console.error("Error fetching movies: ", error);
//         } finally {
//           setLoadingMovie(false);
//         }
//       };
//       const getTvShows = async () => {
//         try {
//           const fetchedTvshows = await fetchTV();
//           setTvshows(fetchedTvshows);
//         } catch (error) {
//           console.error("Error fetching movies: ", error);
//         } finally {
//           setLoadingShow(false);
//         }
//       };
//       getMovies();
//       getTvShows();
//     }, []);
  
//     return (
//       <SafeAreaView className="h-full bg-white">
//         <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
//           <View className="px-5">
//             <View className="flex flex-row items-center justify-between mt-5"></View>
//             <Search
//               onNavigateToExplore={handleNavigateToExplore}
//               autoSearch={false}
//             />
//             <View className="my-5">
//               <View className="flex flex-row items-center justify-betweeen"></View>
//             </View>
//           </View>
//           <View>
//             <View className="flex flex-row items-center justify-between">
//               <Text className="text-xl font-rubik-bold text-black-300">
//                 Movies
//               </Text>
//               <TouchableOpacity>
//                 <Text className="text-base font-rubik-bold txt-primary-300">
//                   see more
//                 </Text>
//               </TouchableOpacity>
//             </View>
  
//             {loadingMovie ? (
//               <ActivityIndicator size="large" color="#000" />
//             ) : (
//               <FlatList
//                 data={movies}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                   <MovieCards
//                     item={item}
//                     onPress={() => handleMoviePress(item.id)}
//                   />
//                 )}
//                 horizontal
//                 contentContainerClassName="flex mt-3"
//               />
//             )}
//           </View>
  
//           <View className="mt-5">
//             <View className="flex flex-row items-center justify-between">
//               <Text className="text-xl font-rubik-bold text-black-300">
//                 Shows
//               </Text>
//               <TouchableOpacity>
//                 <Text className="text-base font-rubik-bold txt-primary-300">
//                   see more
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             {loadingShow ? (
//               <ActivityIndicator size="large" color="#000" />
//             ) : (
//               <FlatList
//                 data={tvshows}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                   <TVShowCards
//                     item={item}
//                     onPress={() => handleTVSowPress(item.id)}
//                   />
//                 )}
//                 horizontal
//                 contentContainerClassName="flex mt-3"
//               />
//             )}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   };
//   export default Home;
  
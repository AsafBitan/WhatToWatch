import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchTVShowByID, TVShow } from "@/app/ApiService";
import { SafeAreaView } from "react-native-safe-area-context";

const Team = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [show, setShow] = useState<TVShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const fetchedTVShowByID = await fetchTVShowByID(id);
        setShow(fetchedTVShowByID);
        if (fetchedTVShowByID?.primaryImage) {
          Image.getSize(fetchedTVShowByID.primaryImage, (width, hight) => {
            setAspectRatio(width / hight);
          });
        }
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00ccbb" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-4 py-6">
          <View className="flex flex-row flex-wrap justify-center mb-3">
            <View
              style={{ aspectRatio }}
              className="w-full aspect-ratio-[16:9] rounded-xl overflow-hidden shadow-lg mb-6"
            >
              {show?.primaryImage ? (
                <Image
                  source={{ uri: show.primaryImage }}
                  className="w-full h-full rounded-2xl"
                  style={{ backgroundColor: "black" }}
                  resizeMode="contain"
                />
              ) : (
                <View className="w-full h-full bg-gray-300 items-center justify-center">
                  <Text className="text-gray-500">No Image Available</Text>
                </View>
              )}
            </View>
            <View className="space-y-4">
              <Text className="font-bold text-xl text-gray-800">
                {show?.title || "Unknown Title"}
              </Text>
              <Text className="text-gray-600 text-lg">
                Release Date:{" "}
                <Text className="font-semibold">
                  {show?.releaseDate || "N/A"}
                </Text>
              </Text>
              <Text className="text-gray-600 text-lg">
                Rating:{" "}
                <Text className="font-semibold">
                  {show?.averageRating || "N/A"}
                </Text>
              </Text>
              <Text className="text-gray-800">
                {show?.description || "No description available."}
              </Text>
              <Text className="text-gray-600">
                Genres:{" "}
                {show?.genres?.length
                  ? show.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Team;

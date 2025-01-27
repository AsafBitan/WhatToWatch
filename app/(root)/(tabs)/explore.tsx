import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { findMulti, TVShow, Movie } from "@/app/ApiService";
import { MovieCards, TVShowCards } from "@/components/Cards";
import { router, useLocalSearchParams } from "expo-router";

const Explore = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [results, setResults] = useState<(TVShow | Movie)[]>([]);

  const handlePress = (id: string, media_type: "movie" | "tvshow") =>
    router.push(`/${media_type}/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <Search onResults={setResults} initialQuery={query} autoSearch={true} />
      <ScrollView className="px-4 mt-4">
        {results.length > 0 ? (
          results.map((item) => (
            <View key={item.id} className="mb-4">
              {item.media_type === "movie" ? (
                <MovieCards
                  item={item}
                  onPress={() => handlePress(item.id, "movie")}
                />
              ) : (
                <TVShowCards
                  item={item}
                  onPress={() => handlePress(item.id, "tvshow")}
                />
              )}
            </View>
          ))
        ) : (
          <Text>No results found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;

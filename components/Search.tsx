import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, usePathname, router } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";
import { TVShow, Movie, findMulti } from "@/app/ApiService";

interface SearchProps {
  onResults?: (results: (TVShow | Movie)[]) => void;
  onNavigateToExplore?: (query: string) => void;
  initialQuery?: string;
  autoSearch?: boolean;
}

const Search = ({
  onResults,
  onNavigateToExplore,
  initialQuery = "",
  autoSearch = false,
}: SearchProps) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const performSearch = async (text: string) => {
    if (!text) {
      onResults?.([]);
      return;
    }

    setLoading(true);
    try {
      if (onNavigateToExplore) {
        onNavigateToExplore(text);
      } else {
        const results = await findMulti(text);
        onResults?.(results);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      onResults?.([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(performSearch, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (autoSearch) {
      debouncedSearch(text);
    }
  };

  const handleSubmit = () => {
    if (search.trim()) {
      performSearch(search);
    }
  };

  useEffect(() => {
    if (initialQuery && !onNavigateToExplore && autoSearch) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5 " />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          onSubmitEditing={handleSubmit}
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <TouchableOpacity>
          <Image source={icons.menu} className="size-3" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;

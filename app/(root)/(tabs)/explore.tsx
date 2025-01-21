import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '@/components/Search';

const Explore = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Search />
    </SafeAreaView>
  );
}

export default Explore
import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Favorites = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView>Favorites</ScrollView>
    </SafeAreaView>
  )
}

export default Favorites
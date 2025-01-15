import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Player = () => {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Player { id }</Text>
    </View>
  )
}

export default Player
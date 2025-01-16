import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import icons from '@/constants/icons'

const TabIcon = ({ focused, icon, title } : { focused: boolean; icon: any; title: string }) => (
    <View className='flex-1 mt-1 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? '#0061ff' : '#666876'} resizeMode='contain' className='size-6'/>
        <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
            {title}
        </Text>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                borderTopColor: '#0061FF1A',
                borderTopWidth: 1,
                maxHeight: 70,
                elevation: 5,
            },
            tabBarHideOnKeyboard: true,
        }}
    >
        <Tabs.Screen
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.home} focused={focused} title="Home"/>
                )
        }}/>
        <Tabs.Screen
            name='explore'
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.search} focused={focused} title="Search"/>
                )
        }}/>
         <Tabs.Screen
            name='favorites'
            options={{
                title: 'Favorites',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.chartGraph} focused={focused} title="Favorites"/>
                )
        }}/>
        <Tabs.Screen
            name='wantToWatch'
            options={{
                title: 'Want To Watch',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.chartHistogram} focused={focused} title="Want To Watch"/>
                )
        }}/>
       
    </Tabs>
  )
}

export default TabsLayout
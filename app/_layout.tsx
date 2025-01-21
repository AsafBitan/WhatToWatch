import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return(
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </>
  ) 
}

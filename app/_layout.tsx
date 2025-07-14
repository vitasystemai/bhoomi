import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/constants/theme";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="chatbot" 
          options={{ 
            title: "BHOOMI AI Chatbot",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="weather" 
          options={{ 
            title: "Weather Forecast",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="market-prices" 
          options={{ 
            title: "Market Prices",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="schemes" 
          options={{ 
            title: "Government Schemes",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="scheme-details/[id]" 
          options={{ 
            title: "Scheme Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="crops" 
          options={{ 
            title: "Crop Guide",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="crop-details/[id]" 
          options={{ 
            title: "Crop Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="store" 
          options={{ 
            title: "Bhoomi Store",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="product-details/[id]" 
          options={{ 
            title: "Product Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="seeds-storage" 
          options={{ 
            title: "Seeds Storage",
            presentation: "card",
          }} 
        />
      </Stack>
    </>
  );
}
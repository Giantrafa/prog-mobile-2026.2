import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ColorValue, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { darkTheme, lightTheme, navigationDarkTheme, navigationLightTheme } from "@/theme";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

function tabIcon(name: IconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const paperTheme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={isDark ? navigationDarkTheme : navigationLightTheme}>
          <StatusBar style={isDark ? "light" : "dark"} />
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: paperTheme.colors.primary,
              tabBarInactiveTintColor: paperTheme.colors.onSurfaceVariant,
              tabBarStyle: { backgroundColor: paperTheme.colors.surface },
              headerStyle: { backgroundColor: paperTheme.colors.surface },
              headerTintColor: paperTheme.colors.onSurface,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{ title: "Início", tabBarIcon: tabIcon("home-outline") }}
            />
            <Tabs.Screen
              name="sobre"
              options={{ title: "Sobre", tabBarIcon: tabIcon("account-outline") }}
            />
            <Tabs.Screen
              name="contato"
              options={{ title: "Contato", tabBarIcon: tabIcon("message-text-outline") }}
            />
          </Tabs>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

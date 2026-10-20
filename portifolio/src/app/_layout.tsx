import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ColorValue, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CurriculoProvider } from "@/contexts/CurriculoContext";
import { darkTheme, lightTheme, navigationDarkTheme, navigationLightTheme } from "@/theme";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

function tabIcon(name: IconName) {
  return function TabIcon({ color, size }: { color: ColorValue; size: number }) {
    return <MaterialCommunityIcons name={name} color={color} size={size} />;
  };
}

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const paperTheme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <CurriculoProvider>
          <ThemeProvider value={isDark ? navigationDarkTheme : navigationLightTheme}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: paperTheme.colors.primary,
                tabBarInactiveTintColor: paperTheme.colors.onSurfaceVariant,
                tabBarStyle: { backgroundColor: paperTheme.colors.surface },
                tabBarLabelStyle: { fontSize: 10 },
                headerStyle: { backgroundColor: paperTheme.colors.surface },
                headerTintColor: paperTheme.colors.onSurface,
              }}
            >
              <Tabs.Screen
                name="index"
                options={{ title: "Início", tabBarIcon: tabIcon("home-outline") }}
              />
              <Tabs.Screen
                name="academica"
                options={{
                  title: "Experiência Acadêmica",
                  tabBarLabel: "Acadêmica",
                  tabBarIcon: tabIcon("school-outline"),
                }}
              />
              <Tabs.Screen
                name="profissional"
                options={{
                  title: "Experiência Profissional",
                  tabBarLabel: "Profissional",
                  tabBarIcon: tabIcon("briefcase-outline"),
                }}
              />
              <Tabs.Screen
                name="projetos"
                options={{ title: "Projetos", tabBarIcon: tabIcon("folder-outline") }}
              />
              <Tabs.Screen
                name="contato"
                options={{ title: "Contato", tabBarIcon: tabIcon("message-text-outline") }}
              />
              <Tabs.Screen
                name="sobre"
                options={{ title: "Sobre", tabBarIcon: tabIcon("information-outline") }}
              />
            </Tabs>
          </ThemeProvider>
        </CurriculoProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

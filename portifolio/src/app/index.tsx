import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";

import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { profile } from "@/constants/profile";
import { spacing } from "@/theme";

export default function Home() {
  const theme = useTheme();

  return (
    <Screen>
      <View style={styles.hero}>
        <Avatar.Text
          size={96}
          label={profile.foto}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <Text variant="headlineMedium" style={styles.center}>
          {profile.name}
        </Text>
                
        <Text variant="bodyLarge" style={[styles.center, { color: theme.colors.onSurfaceVariant }]}>
          {profile.tagline}
        </Text>
      </View>

      <SectionCard title="Sobre este app">
        <Text variant="bodyMedium">
          Este app foi criado utilizando React Native com React paper com uma conexao a uma api REST para pegar certos dados, e uma area extra para entra em contato
        </Text>
      </SectionCard>      
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  center: {
    textAlign: "center",
  },
  actions: {
    gap: spacing.sm,
  },
});

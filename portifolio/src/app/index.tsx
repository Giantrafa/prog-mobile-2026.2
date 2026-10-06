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
          label={profile.initials}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <Text variant="headlineMedium" style={styles.center}>
          {profile.name}
        </Text>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {profile.role}
        </Text>
        <Text variant="bodyLarge" style={[styles.center, { color: theme.colors.onSurfaceVariant }]}>
          {profile.tagline}
        </Text>
      </View>

      <SectionCard title="Bem-vindo(a)!">
        <Text variant="bodyMedium">
          Conheça um pouco mais sobre mim e, se quiser conversar, é só entrar em contato.
        </Text>
      </SectionCard>

      <View style={styles.actions}>
        <Button mode="contained" icon="account-outline" onPress={() => router.navigate("/sobre")}>
          Sobre mim
        </Button>
        <Button
          mode="outlined"
          icon="message-text-outline"
          onPress={() => router.navigate("/contato")}
        >
          Contato
        </Button>
      </View>
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

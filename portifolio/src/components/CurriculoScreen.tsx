import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";

import type { Curriculo } from "@/api/types";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { useCurriculo } from "@/contexts/CurriculoContext";
import { spacing } from "@/theme";

type Props = {
  children: (curriculo: Curriculo) => ReactNode;
};

export function CurriculoScreen({ children }: Props) {
  const theme = useTheme();
  const { curriculo, carregando, erro, recarregar } = useCurriculo();

  if (erro) {
    return (
      <Screen>
        <SectionCard title="Não foi possível carregar o currículo">
          <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
            {erro}
          </Text>
          <Button mode="contained" icon="refresh" onPress={recarregar}>
            Tentar novamente
          </Button>
        </SectionCard>
      </Screen>
    );
  }

  if (!curriculo) {
    return (
      <View style={[styles.centro, { backgroundColor: theme.colors.background }]}>
        {carregando ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text variant="bodyLarge">Nenhum currículo cadastrado.</Text>
        )}
      </View>
    );
  }

  return (
    <Screen refreshing={carregando} onRefresh={recarregar}>
      {children(curriculo)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
});

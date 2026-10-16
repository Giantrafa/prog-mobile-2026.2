import { StyleSheet, View } from "react-native";
import { Avatar, Chip, Text, useTheme } from "react-native-paper";

import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";
import { useCurriculo } from "@/contexts/CurriculoContext";
import { spacing } from "@/theme";
import { iniciais } from "@/utils/formatar";

export default function Home() {
  const theme = useTheme();
  const { pessoas, pessoaId, selecionarPessoa } = useCurriculo();

  return (
    <CurriculoScreen>
      {(curriculo) => (
        <>
          <View style={styles.hero}>
            {curriculo.foto_url ? (
              <Avatar.Image size={96} source={{ uri: curriculo.foto_url }} />
            ) : (
              <Avatar.Text
                size={96}
                label={iniciais(curriculo.nome)}
                style={{ backgroundColor: theme.colors.primary }}
              />
            )}
            <Text variant="headlineMedium" style={styles.center}>
              {curriculo.nome}
            </Text>
            {curriculo.titulo && (
              <Text variant="bodyLarge" style={[styles.center, { color: theme.colors.onSurfaceVariant }]}>
                {curriculo.titulo}
              </Text>
            )}
            {curriculo.cidade && (
              <Text variant="bodyMedium" style={[styles.center, { color: theme.colors.onSurfaceVariant }]}>
                {curriculo.cidade}
              </Text>
            )}
          </View>

          {pessoas.length > 1 && (
            <SectionCard title="Ver currículo de">
              <View style={styles.chips}>
                {pessoas.map((pessoa) => (
                  <Chip
                    key={pessoa.id}
                    icon="account"
                    selected={pessoa.id === pessoaId}
                    showSelectedOverlay
                    onPress={() => selecionarPessoa(pessoa.id)}
                  >
                    {pessoa.nome}
                  </Chip>
                ))}
              </View>
            </SectionCard>
          )}

          <SectionCard title="Resumo">
            <View style={styles.resumo}>
              <Text variant="bodyMedium">{curriculo.experiencias.length} experiência(s) profissional(is)</Text>
              <Text variant="bodyMedium">{curriculo.formacoes.length} formação(ões)</Text>
              <Text variant="bodyMedium">{curriculo.projetos.length} projeto(s)</Text>
              <Text variant="bodyMedium">{curriculo.habilidades.length} habilidade(s)</Text>
            </View>
          </SectionCard>

          <SectionCard title="Sobre este app">
            <Text variant="bodyMedium">
              Este app foi criado utilizando React Native com React Native Paper e busca todos os
              dados do currículo em uma API REST (Express + PostgreSQL), com uma área extra para
              entrar em contato.
            </Text>
          </SectionCard>
        </>
      )}
    </CurriculoScreen>
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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  resumo: {
    gap: spacing.xs,
  },
});

import { Linking, StyleSheet, View } from "react-native";
import { Avatar, Button, Chip, List, Text, useTheme } from "react-native-paper";

import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";
import { useCurriculo } from "@/contexts/CurriculoContext";
import { spacing } from "@/theme";
import { compartilharCurriculo } from "@/utils/compartilhar";
import { iniciais, mesAno, rotulo } from "@/utils/formatar";

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
            <Button
              mode="contained-tonal"
              icon="share-variant"
              onPress={() => compartilharCurriculo(curriculo).catch(() => {})}
              style={styles.compartilhar}
            >
              Compartilhar currículo
            </Button>
          </View>

          {curriculo.resumo && (
            <SectionCard title="Quem sou eu">
              <Text variant="bodyMedium">{curriculo.resumo}</Text>
            </SectionCard>
          )}

          {curriculo.habilidades.length > 0 && (
            <SectionCard title="Habilidades">
              <View style={styles.chips}>
                {curriculo.habilidades.map((habilidade) => (
                  <Chip key={habilidade.id} compact>
                    {habilidade.nome} · {rotulo(habilidade.nivel)}
                  </Chip>
                ))}
              </View>
            </SectionCard>
          )}

          {curriculo.certificacoes.length > 0 && (
            <SectionCard title="Certificações">
              {curriculo.certificacoes.map((certificacao) => (
                <List.Item
                  key={certificacao.id}
                  title={certificacao.nome}
                  description={[
                    certificacao.emissor,
                    mesAno(certificacao.data_emissao),
                    certificacao.carga_horaria ? `${certificacao.carga_horaria}h` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  titleNumberOfLines={2}
                  descriptionNumberOfLines={3}
                  onPress={
                    certificacao.url_credencial
                      ? () => Linking.openURL(certificacao.url_credencial!)
                      : undefined
                  }
                  left={(props) => <List.Icon {...props} icon="certificate-outline" />}
                  style={styles.listItem}
                />
              ))}
            </SectionCard>
          )}

          {curriculo.idiomas.length > 0 && (
            <SectionCard title="Idiomas">
              <View style={styles.chips}>
                {curriculo.idiomas.map((idioma) => (
                  <Chip key={idioma.id} icon="translate" compact>
                    {idioma.idioma} · {rotulo(idioma.nivel)}
                  </Chip>
                ))}
              </View>
            </SectionCard>
          )}
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
  listItem: {
    paddingHorizontal: 0,
  },
  compartilhar: {
    marginTop: spacing.sm,
  },
});

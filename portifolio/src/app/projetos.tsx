import { Linking, StyleSheet, View } from "react-native";
import { Button, Chip, Text, useTheme } from "react-native-paper";

import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";
import { spacing } from "@/theme";
import { periodo } from "@/utils/formatar";

export default function Projetos() {
  const theme = useTheme();

  return (
    <CurriculoScreen>
      {(curriculo) =>
        curriculo.projetos.length === 0 ? (
          <SectionCard title="Projetos">
            <Text variant="bodyMedium">Nenhum projeto cadastrado.</Text>
          </SectionCard>
        ) : (
          curriculo.projetos.map((projeto) => {
            const experiencia = curriculo.experiencias.find((e) => e.id === projeto.experiencia_id);
            const datas = periodo(projeto.data_inicio, projeto.data_fim);

            return (
              <SectionCard key={projeto.id} title={projeto.nome}>
                {(datas || experiencia) && (
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    {[datas, experiencia && `em ${experiencia.empresa}`].filter(Boolean).join(" · ")}
                  </Text>
                )}

                {projeto.descricao && <Text variant="bodyMedium">{projeto.descricao}</Text>}

                {projeto.tecnologias.length > 0 && (
                  <View style={styles.chips}>
                    {projeto.tecnologias.map((tecnologia) => (
                      <Chip key={tecnologia.id} compact>
                        {tecnologia.nome}
                      </Chip>
                    ))}
                  </View>
                )}

                {(projeto.url_repositorio || projeto.url_demo) && (
                  <View style={styles.acoes}>
                    {projeto.url_repositorio && (
                      <Button
                        mode="outlined"
                        icon="github"
                        compact
                        onPress={() => Linking.openURL(projeto.url_repositorio!)}
                      >
                        Repositório
                      </Button>
                    )}
                    {projeto.url_demo && (
                      <Button
                        mode="outlined"
                        icon="open-in-new"
                        compact
                        onPress={() => Linking.openURL(projeto.url_demo!)}
                      >
                        Demo
                      </Button>
                    )}
                  </View>
                )}
              </SectionCard>
            );
          })
        )
      }
    </CurriculoScreen>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  acoes: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});

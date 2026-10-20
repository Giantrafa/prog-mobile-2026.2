import { StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";
import { spacing } from "@/theme";
import { periodo, rotulo } from "@/utils/formatar";

export default function ExperienciaProfissional() {
  const theme = useTheme();

  return (
    <CurriculoScreen>
      {(curriculo) =>
        curriculo.experiencias.length === 0 ? (
          <SectionCard title="Experiência profissional">
            <Text variant="bodyMedium">Nenhuma experiência cadastrada.</Text>
          </SectionCard>
        ) : (
          curriculo.experiencias.map((experiencia) => {
            const projetos = curriculo.projetos.filter((p) => p.experiencia_id === experiencia.id);

            return (
              <SectionCard key={experiencia.id} title={experiencia.cargo}>
                <Text variant="bodyLarge">{experiencia.empresa}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {[periodo(experiencia.data_inicio, experiencia.data_fim), experiencia.local]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>

                <View style={styles.chips}>
                  <Chip compact icon="briefcase-outline">
                    {rotulo(experiencia.tipo)}
                  </Chip>
                  {!experiencia.data_fim && (
                    <Chip compact icon="star-outline">
                      Atual
                    </Chip>
                  )}
                </View>

                {experiencia.descricao && <Text variant="bodyMedium">{experiencia.descricao}</Text>}

                {projetos.length > 0 && (
                  <View style={styles.projetos}>
                    <Text variant="labelLarge">Projetos nesta experiência</Text>
                    <View style={styles.chips}>
                      {projetos.map((projeto) => (
                        <Chip key={projeto.id} compact icon="folder-outline">
                          {projeto.nome}
                        </Chip>
                      ))}
                    </View>
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
  projetos: {
    gap: spacing.xs,
  },
});

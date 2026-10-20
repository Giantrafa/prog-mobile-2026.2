import { StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";
import { spacing } from "@/theme";
import { periodo, rotulo } from "@/utils/formatar";

export default function ExperienciaAcademica() {
  const theme = useTheme();

  return (
    <CurriculoScreen>
      {(curriculo) =>
        curriculo.formacoes.length === 0 ? (
          <SectionCard title="Experiência acadêmica">
            <Text variant="bodyMedium">Nenhuma formação cadastrada.</Text>
          </SectionCard>
        ) : (
          curriculo.formacoes.map((formacao) => (
            <SectionCard key={formacao.id} title={formacao.curso}>
              <Text variant="bodyLarge">{formacao.instituicao}</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {periodo(formacao.data_inicio, formacao.data_fim)}
              </Text>

              <View style={styles.chips}>
                <Chip compact icon="school-outline">
                  {rotulo(formacao.nivel)}
                </Chip>
                <Chip compact icon={formacao.data_fim ? "check-circle-outline" : "progress-clock"}>
                  {formacao.data_fim ? "Concluído" : "Cursando"}
                </Chip>
              </View>

              {formacao.descricao && <Text variant="bodyMedium">{formacao.descricao}</Text>}
            </SectionCard>
          ))
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
});

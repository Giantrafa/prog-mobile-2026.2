import { Linking, StyleSheet, View } from "react-native";
import { Chip, List, Text } from "react-native-paper";

import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";
import { spacing } from "@/theme";
import { mesAno, periodo, rotulo } from "@/utils/formatar";

export default function Sobre() {
  return (
    <CurriculoScreen>
      {(curriculo) => (
        <>
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

          {curriculo.experiencias.length > 0 && (
            <SectionCard title="Experiência profissional">
              {curriculo.experiencias.map((experiencia) => (
                <List.Item
                  key={experiencia.id}
                  title={experiencia.cargo}
                  description={[
                    `${experiencia.empresa} · ${rotulo(experiencia.tipo)}`,
                    periodo(experiencia.data_inicio, experiencia.data_fim),
                    experiencia.descricao,
                  ]
                    .filter(Boolean)
                    .join("\n")}
                  descriptionNumberOfLines={6}
                  left={(props) => <List.Icon {...props} icon="briefcase-outline" />}
                  style={styles.listItem}
                />
              ))}
            </SectionCard>
          )}

          {curriculo.formacoes.length > 0 && (
            <SectionCard title="Formação">
              {curriculo.formacoes.map((formacao) => (
                <List.Item
                  key={formacao.id}
                  title={formacao.curso}
                  description={[
                    `${formacao.instituicao} · ${rotulo(formacao.nivel)}`,
                    periodo(formacao.data_inicio, formacao.data_fim),
                    formacao.descricao,
                  ]
                    .filter(Boolean)
                    .join("\n")}
                  descriptionNumberOfLines={6}
                  left={(props) => <List.Icon {...props} icon="school-outline" />}
                  style={styles.listItem}
                />
              ))}
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
              {curriculo.idiomas.map((idioma) => (
                <List.Item
                  key={idioma.id}
                  title={idioma.idioma}
                  description={rotulo(idioma.nivel)}
                  left={(props) => <List.Icon {...props} icon="translate" />}
                  style={styles.listItem}
                />
              ))}
            </SectionCard>
          )}
        </>
      )}
    </CurriculoScreen>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  listItem: {
    paddingHorizontal: 0,
  },
});

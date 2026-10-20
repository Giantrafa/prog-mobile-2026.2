import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Chip, List, Text } from "react-native-paper";

import { BASE_URL } from "@/api/client";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { spacing } from "@/theme";

const TECNOLOGIAS_APP = [
  { nome: "React Native", icone: "react" },
  { nome: "Expo", icone: "cellphone" },
  { nome: "Expo Router", icone: "routes" },
  { nome: "React Native Paper", icone: "palette-outline" },
  { nome: "TypeScript", icone: "language-typescript" },
];

const TECNOLOGIAS_BACK = [
  { nome: "Node.js", icone: "nodejs" },
  { nome: "Express", icone: "api" },
  { nome: "Sequelize", icone: "database-cog-outline" },
  { nome: "PostgreSQL (NeonDB)", icone: "database-outline" },
  { nome: "Vercel", icone: "cloud-outline" },
];

export default function Sobre() {
  return (
    <Screen>
      <SectionCard title="Sobre o app">
        <Text variant="bodyMedium">
          Aplicativo de currículo/portfólio que busca todos os dados (perfil, experiências
          acadêmicas e profissionais, projetos e contatos) em uma API REST própria. É possível
          alternar entre os currículos cadastrados na tela Início.
        </Text>
      </SectionCard>

      <SectionCard title="Tecnologias do app">
        <View style={styles.chips}>
          {TECNOLOGIAS_APP.map((tecnologia) => (
            <Chip key={tecnologia.nome} icon={tecnologia.icone} compact>
              {tecnologia.nome}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Tecnologias da API">
        <View style={styles.chips}>
          {TECNOLOGIAS_BACK.map((tecnologia) => (
            <Chip key={tecnologia.nome} icon={tecnologia.icone} compact>
              {tecnologia.nome}
            </Chip>
          ))}
        </View>
        <List.Item
          title="Endereço da API"
          description={BASE_URL}
          left={(props) => <List.Icon {...props} icon="web" />}
          style={styles.listItem}
        />
      </SectionCard>

      <SectionCard title="Funcionalidade extra: compartilhar currículo">
        <Text variant="bodyMedium">
          Na tela Início, o botão “Compartilhar currículo” monta um resumo em texto com
          experiências, formação, projetos, habilidades e contatos, e abre o menu de compartilhar
          do celular para enviar por WhatsApp, e-mail ou qualquer outro app.
        </Text>
        <Button mode="contained-tonal" icon="share-variant" onPress={() => router.navigate("/")}>
          Ir para o Início
        </Button>
      </SectionCard>
    </Screen>
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

import { Linking, StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";

import type { TipoContato } from "@/api/types";
import { CurriculoScreen } from "@/components/CurriculoScreen";
import { SectionCard } from "@/components/SectionCard";

const ICONES: Record<TipoContato, string> = {
  email: "email-outline",
  telefone: "phone-outline",
  whatsapp: "whatsapp",
  github: "github",
  linkedin: "linkedin",
  site: "web",
  outro: "link-variant",
};

const TITULOS: Record<TipoContato, string> = {
  email: "E-mail",
  telefone: "Telefone",
  whatsapp: "WhatsApp",
  github: "GitHub",
  linkedin: "LinkedIn",
  site: "Site",
  outro: "Outro",
};

export default function Contato() {
  return (
    <CurriculoScreen>
      {(curriculo) => (
        <>
          <SectionCard title="Vamos conversar?">
            <Text variant="bodyMedium">
              Escolha o canal que preferir — respondo assim que possível.
            </Text>
          </SectionCard>

          <SectionCard title="Canais">
            {curriculo.contatos.length === 0 ? (
              <Text variant="bodyMedium">Nenhum contato cadastrado.</Text>
            ) : (
              curriculo.contatos.map((contato) => (
                <List.Item
                  key={contato.id}
                  title={TITULOS[contato.tipo]}
                  description={contato.valor}
                  onPress={contato.url ? () => Linking.openURL(contato.url!) : undefined}
                  left={(props) => <List.Icon {...props} icon={ICONES[contato.tipo]} />}
                  right={contato.url ? (props) => <List.Icon {...props} icon="chevron-right" /> : undefined}
                  style={styles.listItem}
                />
              ))
            )}
          </SectionCard>
        </>
      )}
    </CurriculoScreen>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 0,
  },
});

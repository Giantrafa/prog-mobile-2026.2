import { Linking, StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";

import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { profile } from "@/constants/profile";

export default function Contato() {
  return (
    <Screen>
      <SectionCard title="Vamos conversar?">
        <Text variant="bodyMedium">
          Escolha o canal que preferir — respondo assim que possível.
        </Text>
      </SectionCard>

      <SectionCard title="Canais">
        {profile.contacts.map((contact) => (
          <List.Item
            key={contact.label}
            title={contact.label}
            description={contact.value}
            onPress={() => Linking.openURL(contact.url)}
            left={(props) => <List.Icon {...props} icon={contact.icon} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
          />
        ))}
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 0,
  },
});

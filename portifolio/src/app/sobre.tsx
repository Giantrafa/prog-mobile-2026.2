import { StyleSheet, View } from "react-native";
import { Chip, List, Text } from "react-native-paper";

import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { profile } from "@/constants/profile";
import { spacing } from "@/theme";

export default function Sobre() {
  return (
    <Screen>
      <SectionCard title="Quem sou eu">
        <Text variant="bodyMedium">{profile.about}</Text>
      </SectionCard>

      <SectionCard title="Habilidades">
        <View style={styles.chips}>
          {profile.skills.map((skill) => (
            <Chip key={skill} compact>
              {skill}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Formação">
        {profile.education.map((item) => (
          <List.Item
            key={item.title}
            title={item.title}
            description={item.subtitle}
            left={(props) => <List.Icon {...props} icon="school-outline" />}
            style={styles.listItem}
          />
        ))}
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

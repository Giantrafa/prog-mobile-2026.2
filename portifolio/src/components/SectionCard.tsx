import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import { spacing } from "@/theme";

type Props = {
  title: string;
  children: ReactNode;
};

export function SectionCard({ title, children }: Props) {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.content}>
        <Text variant="titleMedium">{title}</Text>
        {children}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
  },
});

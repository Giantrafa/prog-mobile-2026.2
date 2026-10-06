import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { spacing } from "@/theme";

type Props = {
  children: ReactNode;
};

export function Screen({ children }: Props) {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
});

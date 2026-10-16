import { ReactNode } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { spacing } from "@/theme";

type Props = {
  children: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function Screen({ children, refreshing = false, onRefresh }: Props) {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        ) : undefined
      }
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

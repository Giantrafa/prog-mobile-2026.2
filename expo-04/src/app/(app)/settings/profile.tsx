import { ScrollView, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import { useAuth } from '@/auth/AuthContext';
import { UserInfoCard } from '@/components/UserInfoCard';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const theme = useTheme();

  if (!user) return null;

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <UserInfoCard user={user} />

      <Button
        mode="contained"
        icon="logout"
        buttonColor={theme.colors.error}
        textColor={theme.colors.onError}
        onPress={signOut}
      >
        Sair da conta
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
});

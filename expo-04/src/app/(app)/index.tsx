import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Chip, Text, useTheme } from 'react-native-paper';

import { isMockToken } from '@/api/auth';
import { useAuth } from '@/auth/AuthContext';
import { UserInfoCard } from '@/components/UserInfoCard';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function HomeScreen() {
  const { user, token } = useAuth();
  const theme = useTheme();

  if (!user) return null;

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        <Avatar.Text size={80} label={initials(user.name)} />
        <Text variant="headlineMedium">Olá, {user.name.split(' ')[0]}!</Text>
        <Text variant="bodyMedium">Bem-vindo ao meu aplicativo.</Text>
        {isMockToken(token) && (
          <Chip icon="cloud-off-outline" compact>
            Modo demonstração (sem servidor)
          </Chip>
        )}
      </View>

      <UserInfoCard user={user} />

      <Button mode="outlined" icon="account-edit-outline" onPress={() => router.push('/settings/profile')}>
        Ver perfil
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 48,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
});

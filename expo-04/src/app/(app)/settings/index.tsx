import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { List, Text } from 'react-native-paper';

import { useAuth } from '@/auth/AuthContext';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Configurações
      </Text>

      <List.Section>
        <List.Item
          title="Perfil"
          description="Edite suas informações"
          left={(props) => (
            <List.Icon {...props} icon="account-outline" />
          )}
          right={(props) => (
            <List.Icon {...props} icon="chevron-right" />
          )}
          onPress={() => router.push('/settings/profile')}
        />

        <List.Item
          title="Notificações"
          description="Configure suas notificações"
          left={(props) => (
            <List.Icon {...props} icon="bell-outline" />
          )}
          right={(props) => (
            <List.Icon {...props} icon="chevron-right" />
          )}
        />

        <List.Item
          title="Aparência"
          description="Configure a aparência do aplicativo"
          left={(props) => (
            <List.Icon {...props} icon="palette-outline" />
          )}
          right={(props) => (
            <List.Icon {...props} icon="chevron-right" />
          )}
          onPress={() => router.push('/settings/appearance')}
        />

        <List.Item
          title="Sair"
          description="Encerrar a sessão neste aparelho"
          left={(props) => (
            <List.Icon {...props} icon="logout" />
          )}
          onPress={signOut}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    marginBottom: 10,
  },
});
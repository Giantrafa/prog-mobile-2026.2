import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function AppearanceScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Aparência
      </Text>

      <Card>
        <Card.Content>
          <Text variant="titleMedium">Android</Text>

          <Text variant="bodyMedium" style={styles.description}>
            Configure a aparência do aplicativo para Android.
          </Text>

          <Button
            mode="contained"
            icon="android"
            onPress={() => {}}
          >
            Usar aparência Android
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    marginBottom: 20,
  },

  description: {
    marginTop: 8,
    marginBottom: 20,
  },
});
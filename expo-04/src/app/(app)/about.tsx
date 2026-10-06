import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium">Sobre</Text>
      <Text variant="bodyLarge" style={styles.text}>
        Aplicativo desenvolvido com Expo e React Native.
      </Text>
      <Text variant="bodyMedium" style={styles.text}>
        Versão 1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('./profile')}
      >
        <SymbolView
          name="person.fill"
          style={styles.icon}
        />

        <View>
          <Text style={styles.optionTitle}>Perfil</Text>
          <Text style={styles.optionDescription}>
            Edite suas informações
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <SymbolView
          name="bell.fill"
          style={styles.icon}
        />

        <View>
          <Text style={styles.optionTitle}>Notificações</Text>
          <Text style={styles.optionDescription}>
            Configure suas notificações
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('./appearance')}
      >
        <SymbolView
          name="paintbrush.fill"
          style={styles.icon}
        />

        <View>
          <Text style={styles.optionTitle}>Aparência</Text>
          <Text style={styles.optionDescription}>
            Escolha a aparência do aplicativo
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#eeeeee',
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },

  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },

  optionDescription: {
    color: '#666',
    marginTop: 4,
  },

  arrow: {
    marginLeft: 'auto',
    fontSize: 28,
    color: '#777',
  },
});
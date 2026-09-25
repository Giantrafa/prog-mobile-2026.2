import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

export default function AppearanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aparência</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tamanho</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={50}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Transparência</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={70}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Arredondamento</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={30}
        />
      </View>
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
    marginBottom: 25,
  },

  card: {
    padding: 18,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
  },

  label: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },

  slider: {
    width: '100%',
    height: 40,
  },
});
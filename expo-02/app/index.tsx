import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [idade, setIdade] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular() {
    let ano = 2026 - Number(idade);
    setResultado('Você nasceu no ano de ' + ano);
  }

  return (
    <View style={{ padding: 30, marginTop: 100 }}>
      <Text>Digite sua idade:</Text>

      <TextInput
        placeholder="Sua idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <Button title="Calcular" onPress={calcular} />

      <Text style={{ marginTop: 20, fontSize: 20 }}>
        {resultado}
      </Text>
    </View>
  );
}
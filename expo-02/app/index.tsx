import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [idade, setIdade] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular() {
    // Fecha o teclado
    Keyboard.dismiss();

    // Pega o ano atual automaticamente
    const anoAtual = new Date().getFullYear();

    // Converte os textos para números
    const idadeNumero = Number(idade);
    const diaNumero = Number(dia);
    const mesNumero = Number(mes);

    // Validação
    if (
      !idade ||
      !dia ||
      !mes ||
      idadeNumero < 0 ||
      diaNumero < 1 ||
      diaNumero > 31 ||
      mesNumero < 1 ||
      mesNumero > 12
    ) {
      setResultado('Por favor, digite uma data e idade válidas.');
      return;
    }

    const anoNascimento = anoAtual - idadeNumero;

    setResultado(
      `Você tem ${idadeNumero} anos e nasceu no dia ${diaNumero}/${mesNumero}/${anoNascimento}.`
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Text style={styles.titulo}>
          Calculadora de Ano de Nascimento
        </Text>

        <Text style={styles.label}>
          Qual é a sua idade?
        </Text>

        <TextInput
          placeholder="Digite sua idade"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          style={styles.input}
        />

        <Text style={styles.label}>
          Qual é o dia do seu nascimento?
        </Text>

        <TextInput
          placeholder="Digite o dia"
          keyboardType="numeric"
          value={dia}
          onChangeText={setDia}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          style={styles.input}
        />

        <Text style={styles.label}>
          Qual é o mês do seu nascimento?
        </Text>

        <TextInput
          placeholder="Digite o mês"
          keyboardType="numeric"
          value={mes}
          onChangeText={setMes}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          style={styles.input}
        />

        <View style={styles.botao}>
          <Button
            title="Calcular"
            onPress={calcular}
          />
        </View>

        <Text style={styles.resultado}>
          {resultado}
        </Text>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 100,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  label: {
    marginTop: 20,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },

  botao: {
    marginTop: 25,
  },

  resultado: {
    marginTop: 20,
    fontSize: 20,
  },
});
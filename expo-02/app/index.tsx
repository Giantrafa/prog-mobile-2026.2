import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard
} from 'react-native';

export default function App() {

  const [idade, setIdade] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular() {

    Keyboard.dismiss();

    const anoAtual = 2026;

    const idadeNumero = Number(idade);
    const diaNumero = Number(dia);
    const mesNumero = Number(mes);

    let anoNascimento = anoAtual - idadeNumero;

    setResultado(
      'Você tem ' +
      idade +
      ' anos e nasceu no dia ' +
      dia +
      ' / ' +
      mes +
      ' / ' +
      anoNascimento +
      '.'
    );
  }

  return (

    <View style={{ padding: 30, marginTop: 100 }}>

      <Text style={{ fontSize: 24 }}>
        Calculadora de Ano de Nascimento
      </Text>

      <Text style={{ marginTop: 20 }}>
        Qual é a sua idade?
      </Text>

      <TextInput
        placeholder="Digite sua idade"
        keyboardType="numeric"
        value={idade}
        returnKeyType="next"
        onSubmitEditing={()=> Keyboard.dismiss()}
        onChangeText={setIdade}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
        }}
      />

      <Text style={{ marginTop: 20 }}>
        Qual é o dia do seu nascimento?
      </Text>

      <TextInput
        placeholder="Digite o dia"
        keyboardType="numeric"
        value={dia}
        returnKeyType="next"
        onSubmitEditing={()=> Keyboard.dismiss()}
        onChangeText={setDia}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
        }}
      />

      <Text style={{ marginTop: 20 }}>
        Qual é o mês do seu nascimento?
      </Text>

      <TextInput
        placeholder="Digite o mês"
        keyboardType="numeric"
        value={mes}
        returnKeyType="next"
        onSubmitEditing={()=> Keyboard.dismiss()}
        onChangeText={setMes}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
        }}
      />

      <Button
        title="Calcular"
        onPress={calcular}
      />

      <Text style={{ marginTop: 20, fontSize: 20 }}>
        {resultado}
      </Text>

    </View>

  );
}
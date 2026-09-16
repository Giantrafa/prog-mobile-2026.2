import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { Dado } from "./Dado";

type Resultado = "j1" | "j2" | "empate";

type Rodada = {
  j1: [number, number];
  j2: [number, number];
  resultado: Resultado;
};

const TOTAL_RODADAS = 5;


export const JogoDados = () => {
  const [rodada, setRodada] = useState(1);
  const [vezJ1, setVezJ1] = useState(true);

  const [dadosJ1, setDadosJ1] = useState<[number, number]>([0, 0]);
  const [dadosJ2, setDadosJ2] = useState<[number, number]>([0, 0]);

  const [historico, setHistorico] = useState<Rodada[]>([]);
  const [finalizado, setFinalizado] = useState(false);
  const [resultadoRodada, setResultadoRodada] =
    useState<Resultado | null>(null);

  const rolar = (): [number, number] => [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];

  const soma = (dados: [number, number]) => {
    return dados[0] + dados[1];
  };

  const somaTotalJ1 = () => {
    return historico.reduce(
      (total, r) => total + soma(r.j1),
      0
    );
  };

  const somaTotalJ2 = () => {
    return historico.reduce(
      (total, r) => total + soma(r.j2),
      0
    );
  };

  const jogarJ1 = () => {
    const dados = rolar();

    setDadosJ1(dados);
    setResultadoRodada(null);
    setVezJ1(false);
  };

  const jogarJ2 = () => {
    const dados = rolar();

    setDadosJ2(dados);

    const s1 = soma(dadosJ1);
    const s2 = soma(dados);

    const resultado: Resultado =
      s1 > s2
        ? "j1"
        : s1 < s2
        ? "j2"
        : "empate";

    setResultadoRodada(resultado);

    const novaRodada: Rodada = {
      j1: dadosJ1,
      j2: dados,
      resultado,
    };

    const novoHistorico = [
      ...historico,
      novaRodada,
    ];

    setHistorico(novoHistorico);

    if (rodada === TOTAL_RODADAS) {
      setFinalizado(true);
    } else {
      setRodada((r) => r + 1);
      setVezJ1(true);
    }
  };

  const reiniciar = () => {
    setRodada(1);
    setVezJ1(true);
    setDadosJ1([0, 0]);
    setDadosJ2([0, 0]);
    setHistorico([]);
    setFinalizado(false);
    setResultadoRodada(null);
  };

  const vencedorFinal = () => {
    const j1 = historico.filter(
      (r) => r.resultado === "j1"
    ).length;

    const j2 = historico.filter(
      (r) => r.resultado === "j2"
    ).length;

    if (j1 > j2) {
      return "Jogador 1 venceu!";
    }

    if (j2 > j1) {
      return "Jogador 2 venceu!";
    }

    return "Empate geral!";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Jogo de Dados
      </Text>

      {!finalizado && (
        <Text style={styles.rodada}>
          Rodada {rodada} de {TOTAL_RODADAS}
        </Text>
      )}

      <View style={styles.jogadores}>
        {/* Jogador 1 */}
        <View style={styles.jogador}>
          <Text style={styles.nomeJogador}>
            Jogador 1
          </Text>

          <View style={styles.dados}>
            <Dado valor={dadosJ1[0]} />
            <Dado valor={dadosJ1[1]} />
          </View>

          <Text style={styles.soma}>
            Soma: {soma(dadosJ1)} | Total:{" "}
            {somaTotalJ1()}
          </Text>

          <Pressable
            onPress={jogarJ1}
            disabled={!vezJ1 || finalizado}
            style={({ pressed }) => [
              styles.botao,
              styles.botaoJ1,
              (!vezJ1 || finalizado) &&
                styles.botaoDesabilitado,
              pressed &&
                vezJ1 &&
                !finalizado &&
                styles.botaoPressionado,
            ]}
          >
            <Text style={styles.textoBotao}>
              Jogar
            </Text>
          </Pressable>
        </View>

        {/* Jogador 2 */}
        <View style={styles.jogador}>
          <Text style={styles.nomeJogador}>
            Jogador 2
          </Text>

          <View style={styles.dados}>
            <Dado valor={dadosJ2[0]} />
            <Dado valor={dadosJ2[1]} />
          </View>

          <Text style={styles.soma}>
            Soma: {soma(dadosJ2)} | Total:{" "}
            {somaTotalJ2()}
          </Text>

          <Pressable
            onPress={jogarJ2}
            disabled={vezJ1 || finalizado}
            style={({ pressed }) => [
              styles.botao,
              styles.botaoJ2,
              (vezJ1 || finalizado) &&
                styles.botaoDesabilitado,
              pressed &&
                !vezJ1 &&
                !finalizado &&
                styles.botaoPressionado,
            ]}
          >
            <Text style={styles.textoBotao}>
              Jogar
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Resultado da rodada */}
      {resultadoRodada && (
        <Text style={styles.resultado}>
          {resultadoRodada === "j1" &&
            "Jogador 1 ganhou a rodada!"}

          {resultadoRodada === "j2" &&
            "Jogador 2 ganhou a rodada!"}

          {resultadoRodada === "empate" &&
            "Empate!"}
        </Text>
      )}

      {/* Resultado final */}
      {finalizado && (
        <View style={styles.final}>
          <Text style={styles.vencedor}>
            {vencedorFinal()}
          </Text>

          <Pressable
            onPress={reiniciar}
            style={({ pressed }) => [
              styles.botao,
              styles.botaoReiniciar,
              pressed && styles.botaoPressionado,
            ]}
          >
            <Text style={styles.textoBotao}>
              Jogar Novamente
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  rodada: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  jogadores: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },

  jogador: {
    alignItems: "center",
    minWidth: 150,
  },

  nomeJogador: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  dados: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  soma: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },

  botao: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
  },

  botaoJ1: {
    backgroundColor: "#3b82f6",
  },

  botaoJ2: {
    backgroundColor: "#22c55e",
  },

  botaoReiniciar: {
    backgroundColor: "#a855f7",
    marginTop: 15,
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  botaoPressionado: {
    transform: [{ scale: 0.95 }],
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultado: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
  },

  final: {
    alignItems: "center",
    marginTop: 25,
  },

  vencedor: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

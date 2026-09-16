import React from "react";
import { Image, StyleSheet } from "react-native";

const imagens = {
  1: require("../../assets/dados/Dado1.png"),
  2: require("../../assets/dados/Dado2.png"),
  3: require("../../assets/dados/Dado3.png"),
  4: require("../../assets/dados/Dado4.png"),
  5: require("../../assets/dados/Dado5.png"),
  6: require("../../assets/dados/Dado6.png"),
};

type DadoProps = {
  valor: number;
};

export function Dado({ valor }: DadoProps) {
  if (valor < 1 || valor > 6) {
    return null;
  }

  return (
    <Image
      source={imagens[valor as keyof typeof imagens]}
      style={styles.dado}
    />
  );
}

const styles = StyleSheet.create({
  dado: {
    width: 60,
    height: 60,
  },
});

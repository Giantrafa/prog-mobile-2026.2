import { Text, View } from "react-native";
import MiniBio from "../components/MiniBio";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        App criado para a disciplina Programação para Dispositivos Móveis
      </Text>
      <MiniBio />
    </View>
  );
}

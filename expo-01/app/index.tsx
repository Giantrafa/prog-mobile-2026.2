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
      <text>
        App criado para a diciplina Proramação para Dispositivos Móveis
      </text>

    <MiniBio/>
    </View>
  );
}

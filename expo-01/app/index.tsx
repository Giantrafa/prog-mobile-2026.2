import { Text, View } from "react-native";
import ImageComponent from "../components/Image";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageComponent/>       
      <Text>Rafael de assis</Text>
      <Text>Este app esta quebrado</Text>
    </View>
  );
}

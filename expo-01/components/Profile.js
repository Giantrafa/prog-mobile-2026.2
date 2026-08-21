import { Image, Text } from "react-native";

export default function Profile() {
  return (
    <>
      <Image
        source={require("./imagens/selfie.jpeg")}
        style={{ width: 200, height: 200 }}
      />

      <Text>
        Rafael de Assis
      </Text>
    </>
  );
}
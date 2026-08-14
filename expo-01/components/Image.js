import { Image as RNImage } from 'react-native';

export default function ImageComponent() {
  return (
    <RNImage
      source={require('./imagens/carro.jpg')}
      style={{ width: 200, height: 200 }}
    />
  );
}
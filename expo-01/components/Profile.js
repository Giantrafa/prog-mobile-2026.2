import { Image as RNImage } from 'react-native';

export default function Profile() {
    return(
        <>
        <RNImage
      source={require('./imagens/carro.jpg')}
      style={{ width: 200, height: 200 }}
        />
            <text>
            exemplo 2
            </text>        
        </>
    );
}
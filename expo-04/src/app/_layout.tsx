import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon sf="house.fill" />
          <NativeTabs.Trigger.Label>Início</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="about">
          <NativeTabs.Trigger.Icon sf="info.circle.fill" />
          <NativeTabs.Trigger.Label>Sobre</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Icon sf="gearshape.fill" />
          <NativeTabs.Trigger.Label>Configurações</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </PaperProvider>
  );
}
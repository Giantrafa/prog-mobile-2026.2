import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Configurações',
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: 'Perfil',
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="appearance"
        options={{
          title: 'Aparência',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
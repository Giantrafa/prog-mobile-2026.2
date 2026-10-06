import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { useAuth } from '@/auth/AuthContext';
import { isValidEmail } from '@/auth/validation';
import { FormScreen } from '@/components/FormScreen';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!isValidEmail(email) || !password) {
      setError('Informe um e-mail válido e a senha.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormScreen>
      <Text variant="headlineMedium" style={styles.title}>
        Bem-vindo de volta
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Entre com sua conta para continuar.
      </Text>

      <TextInput
        mode="outlined"
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        left={<TextInput.Icon icon="email-outline" />}
      />

      <TextInput
        mode="outlined"
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        autoComplete="current-password"
        textContentType="password"
        left={<TextInput.Icon icon="lock-outline" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onSubmitEditing={handleLogin}
      />

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>

      <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading}>
        Entrar
      </Button>

      <Link href="/cadastro" asChild>
        <Button mode="text">Não tem conta? Cadastre-se</Button>
      </Link>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { useAuth } from '@/auth/AuthContext';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '@/auth/validation';
import { FormScreen } from '@/components/FormScreen';

export default function CadastroScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!name.trim()) return 'Informe seu nome.';
    if (!isValidEmail(email)) return 'Informe um e-mail válido.';
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    if (password !== confirmPassword) return 'As senhas não coincidem.';
    return '';
  }

  async function handleSignUp() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);
    try {
      await signUp({ name, email, password });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormScreen>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Preencha seus dados para criar uma conta.
      </Text>

      <TextInput
        mode="outlined"
        label="Nome"
        value={name}
        onChangeText={setName}
        autoComplete="name"
        textContentType="name"
        left={<TextInput.Icon icon="account-outline" />}
      />

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
        autoComplete="new-password"
        textContentType="newPassword"
        left={<TextInput.Icon icon="lock-outline" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <TextInput
        mode="outlined"
        label="Confirmar senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
        autoComplete="new-password"
        textContentType="newPassword"
        left={<TextInput.Icon icon="lock-check-outline" />}
        onSubmitEditing={handleSignUp}
      />

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>

      <Button mode="contained" onPress={handleSignUp} loading={loading} disabled={loading}>
        Criar conta
      </Button>

      <Button mode="text" onPress={() => router.back()}>
        Já tenho conta
      </Button>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

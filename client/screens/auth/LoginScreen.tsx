import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authStyle } from './authStyle';

export default function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login with:', { email, password });
    // TODO: Dispatch login action
  };

  return (
    <View style={[authStyle.container]}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Login</Text>

      {/* Email Input */}
      <FormControl style={{ width: '90%' }}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Email</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={{
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 8,
            paddingHorizontal: 12,
          }}
        >
          <InputField
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ fontSize: 16, paddingVertical: 12 }}
          />
        </Input>
      </FormControl>

      {/* Password Input */}
      <FormControl style={{ width: '90%', marginTop: 16 }}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Password</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={{
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 8,
            paddingHorizontal: 12,
          }}
        >
          <InputField
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ fontSize: 16, paddingVertical: 12 }}
          />
        </Input>
      </FormControl>


      {/* Login Button */}
      <Button
        size="xl"
        variant="solid"
        action="primary"
        onPress={handleLogin}
        accessibilityLabel="Login Button"
        style={{
          width: '90%',
          paddingVertical: 14,
          borderRadius: 8,
          backgroundColor: '#1D4ED8', // Optional: override primary color if desired
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
          Login
        </Text>
      </Button>

      {/* Signup Link */}
      <TouchableOpacity onPress={onSwitch} style={authStyle.container}>
        <Text style={authStyle.signupLink}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
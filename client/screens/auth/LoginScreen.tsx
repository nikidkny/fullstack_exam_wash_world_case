import { useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { authStyle } from './authStyle';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigationType';
import { useLogin } from './users/useLogin';

export default function LoginScreen() {
  const { login: loginUser } = useLogin();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('123456A');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = async () => {
    setErrors({});
    const newErrors: Record<string, string> = {};

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password cannot be empty.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userDto = {
        email: email.trim(),
        password: password.trim(),
      };
      const result = await loginUser(userDto);

      setEmail('');
      setPassword('');
      if (!result.success) {
        if (result.error?.includes('User with email')) {
          setErrors({ login: 'Invalid Credentials. Please try again.' });
        } else {
          setErrors({ login: result.error || 'Login failed. Please try again.' });
        }
        return;
      }
    } catch (error) {
      setErrors({ login: 'Something went wrong. Please try again later.' });
      console.error(error);
    }
  };

  return (
    <View style={[authStyle.container]}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Login</Text>

      {/* Email Input */}
      <FormControl style={authStyle.formControl} isInvalid={!!errors.email}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Email</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={[authStyle.input, !!errors.email && { borderColor: 'red' }]}
        >
          <InputField
            placeholder="you@example.com"
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            keyboardType="default"
            autoCapitalize="none"
            style={authStyle.inputField}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
            {errors.email}
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      {/* Password Input */}
      <FormControl style={authStyle.formControl} isInvalid={!!errors.password}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Password</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={[authStyle.input, !!errors.password && { borderColor: 'red' }]}
        >
          <InputField
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            secureTextEntry
            style={authStyle.inputField}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
            {errors.password}
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      {/* General login error */}
      {errors.login && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.login}</Text>}

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
          height: 50,
          backgroundColor: '#1D4ED8',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
          LoginButton
        </Text>
      </Button>

      {/* Signup Link */}

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ paddingTop: 20 }}>
        <Text style={authStyle.signupLink}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RootStackParamList } from '@/navigationType';

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signup'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login with:', { email, password });
    // TODO: Dispatch login action
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };


  return (
    <View style={[styles.container]}>
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
      <TouchableOpacity onPress={goToSignup} style={styles.container}>
        <Text style={styles.signupLink}>Don't have an account?</Text>
        <Text style={styles.signupLink}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    paddingTop: 200,
  },
  signupLink: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
    paddingBottom:40
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
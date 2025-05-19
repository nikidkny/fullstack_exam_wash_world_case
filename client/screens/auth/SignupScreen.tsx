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

export default function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log('Signup with:', { email, password });
    // TODO: Dispatch signup action
  };

  const goToLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container]}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Signup</Text>

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
        onPress={handleSignup}
        accessibilityLabel="Singup Button"
        style={{
          width: '90%',
          paddingVertical: 14,
          borderRadius: 8,
          backgroundColor: '#1D4ED8', // Optional: override primary color if desired
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
          Signup
        </Text>
      </Button>

      {/* Signup Link */}
      <TouchableOpacity onPress={goToLogin} style={styles.container}>
        <Text style={styles.signupLink}>login with existing account</Text>
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
    paddingBottom:120
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
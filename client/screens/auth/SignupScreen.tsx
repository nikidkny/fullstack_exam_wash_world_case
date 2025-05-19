import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { authStyle } from './authStyle';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignupScreen({ onSwitch }: { onSwitch: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState('');
  const [membershipPlanId, setMembershipPlanId] = useState(0);

  const formatDanishPhone = (input: string) => {
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '').slice(0, 8);

    // Format as "12 34 56 78"
    return digitsOnly.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  };


  const handleSignup = () => {
    console.log('Signup with:', { email, password });
    // TODO: Dispatch signup action
  };


  return (
    <ScrollView contentContainerStyle={authStyle.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Signup</Text>

      {/* first_name Input */}
      <FormControl style={authStyle.formControl}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>First Name</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={authStyle.input}
        >
          <InputField
            placeholder="John"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            style={authStyle.inputField}
          />
        </Input>
      </FormControl>

      {/* last_name Input */}
      <FormControl style={authStyle.formControl}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Last Name</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={authStyle.input}
        >
          <InputField
            placeholder="Doe"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            style={authStyle.inputField}
          />
        </Input>
      </FormControl>

      {/* Email Input */}
      <FormControl style={authStyle.formControl}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Email</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={authStyle.input}
        >
          <InputField
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={authStyle.inputField}
          />
        </Input>
      </FormControl>

      {/* phone_number Input */}
      <FormControl style={authStyle.formControl}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Phone Number</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={authStyle.input}
        >
          <InputField
            placeholder="28 28 28 28"
            value={phoneNumber}
            onChangeText={(text) => {
              const formatted = formatDanishPhone(text);
              setPhoneNumber(formatted);
            }}
            keyboardType="numeric"
            inputMode='numeric'
            autoCapitalize="none"
            style={authStyle.inputField}
          />
        </Input>
      </FormControl>

      {/* Password Input */}
      <FormControl style={authStyle.formControl}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Password</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={authStyle.input}
        >
          <InputField
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={authStyle.inputField}
          />
        </Input>
      </FormControl>

      {/* Password Input */}
      <FormControl style={authStyle.formControl}>
        <FormControlLabel>
          <FormControlLabelText style={{ fontSize: 18 }}>Repeat Password</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="xl"
          style={authStyle.input}
        >
          <InputField
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={authStyle.inputField}
          />
        </Input>
      </FormControl>


      {/* Signup Button */}
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
          backgroundColor: '#1D4ED8',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
          Signup
        </Text>
      </Button>

      {/* Signup Link */}
      <TouchableOpacity onPress={onSwitch} style={{ paddingTop: 50 }}>
        <Text style={authStyle.signupLink}>login with existing account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

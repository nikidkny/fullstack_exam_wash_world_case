import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <View>
      {isSignup ? (
        <SignupScreen onSwitch={() => setIsSignup(false)} />
      ) : (
        <LoginScreen onSwitch={() => setIsSignup(true)} />
      )}
    </View>
  );
}

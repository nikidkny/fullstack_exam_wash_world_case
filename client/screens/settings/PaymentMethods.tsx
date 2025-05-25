import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

export default function PaymentMethods() {
  const route = useRoute();
  const { user } = route.params;
  // Update payment method logic
  const handleUpdatePaymentMethod = () => {};

  return (
    <View>
      <Text>PaymentMethods</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

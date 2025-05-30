import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';

export default function BillingHistory() {
  const route = useRoute();
  const { user } = route.params;
  const [billingHistory, setBillingHistory] = useState([
    { id: 1, date: '2024-05-01', amount: 80 },
    { id: 2, date: '2024-05-10', amount: 120 },
  ]);
  return (
    <View>
      {billingHistory.map((bill) => (
        <View key={bill.id} style={styles.card}>
          <Text style={styles.cardText}>Date: {bill.date}</Text>
          <Text style={styles.cardText}>Amount: ${bill.amount}</Text>
        </View>
      ))}{' '}
    </View>
  );
}

const styles = StyleSheet.create({
  subheading: {
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
});

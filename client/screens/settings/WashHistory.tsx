import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function WashHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [washHistory, setWashHistory] = useState([
    { id: 1, date: '2024-05-01', location: 'QuickWash Downtown' },
    { id: 2, date: '2024-05-10', location: 'EcoWash North' },
  ]);
  return (
    <View>
      {washHistory.map((wash) => (
        <View key={wash.id} style={styles.card}>
          <Text style={styles.cardText}>Date: {wash.date}</Text>
          <Text style={styles.cardText}>Location: {wash.location}</Text>
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

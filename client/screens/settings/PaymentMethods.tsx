import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';

export default function PaymentMethods() {
  const route = useRoute();
  const { user } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [editedCardholderName, setEditedCardholderName] = useState(user.cardholderName || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleUpdatePaymentMethod = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }

    // Add API call here to update payment method
    console.log('Updating payment method:', {
      cardNumber,
      expiryDate,
      cvv,
    });

    Alert.alert('Success', 'Your payment method was updated!');
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Cardholder Name</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={[styles.input]}>
            <InputField
              placeholder="Name on card"
              value={editedCardholderName}
              onChangeText={setEditedCardholderName}
              keyboardType="default"
              autoCapitalize="words"
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={styles.value}>{user.cardholderName}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Card Number</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={styles.input}>
            <InputField
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={styles.value}>{cardNumber || 'Not set'}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Expiry Date</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={styles.input}>
            <InputField
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="default"
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={styles.value}>{expiryDate || 'Not set'}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>CVV</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={styles.input}>
            <InputField
              placeholder="123"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              secureTextEntry
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={styles.value}>{cvv ? '***' : 'Not set'}</Text>
        )}
      </View>
      <View style={styles.row}>
        {isEditing ? (
          <>
            <View style={styles.button}>
              <Button
                size="xl"
                variant="solid"
                action="primary"
                onPress={() => setIsEditing(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                size="xl"
                variant="solid"
                action="primary"
                onPress={handleUpdatePaymentMethod}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Save</Text>
              </Button>
            </View>
          </>
        ) : (
          <View style={styles.button}>
            <Button
              size="xl"
              variant="solid"
              action="primary"
              onPress={() => setIsEditing(true)}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Edit Payment Method</Text>
            </Button>
          </View>
        )}
      </View>{' '}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#F7F7F7',
    borderColor: '#666666',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: 'black',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#06C167',
    borderColor: '#06C167',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

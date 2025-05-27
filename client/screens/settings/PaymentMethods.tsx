import { StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCardsByUserId, createCard } from '@/store/cardSlice';
import { get } from '@gluestack-style/react';

export default function PaymentMethods() {
  // const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const card = useSelector((state: RootState) => state.card.cards);
  console.log('PaymentMethods user:', user);
  console.log('PaymentMethods cards:', card);
  // fetch the cards details from cards table using userId
  useEffect(() => {
    if (user?.userId) {
      // only do it it if the result from the cards table is not empty
      dispatch(getCardsByUserId(user.userId));
    }
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [cardholderName, setCardholderName] = useState(card.cardholder_name || '');
  const [cardNumber, setCardNumber] = useState(card.card_number || '');
  const [expiryDate, setExpiryDate] = useState(card.expiry_date || '');
  const [cvc, setCvc] = useState(card.cvc || '');
  const handleUpdatePaymentMethod = () => {
    if (!cardNumber || !expiryDate || !cvc) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }

    const cardDto = {
      user_id: user?.userId,
      cardholder_name: cardholderName,
      card_number: cardNumber, // Remove spaces
      expiry_date: expiryDate,
      cvc: cvc,
    };
    // Add API call here to update payment method
    console.log('Payload being sent:', cardDto);
    dispatch(createCard(cardDto));

    Alert.alert('Success', 'Your payment method was updated!');
    setIsEditing(false);
  };

  console.log('id type' + typeof user?.userId);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Cardholder Name</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={[styles.input]}>
            <InputField
              placeholder="Cardholder Name"
              value={cardholderName}
              onChangeText={setCardholderName}
              keyboardType="default"
              autoCapitalize="words"
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={cardholderName ? styles.value : styles.placeholder}>
            {cardholderName || 'Cardholder Name'}
          </Text>
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
          <Text style={cardNumber ? styles.value : styles.placeholder}>
            {cardNumber || '1234 5678 9012 3456'}
          </Text>
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
          <Text style={expiryDate ? styles.value : styles.placeholder}>
            {expiryDate || 'MM/YY'}
          </Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>CVC</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={styles.input}>
            <InputField
              placeholder="123"
              value={cvc}
              onChangeText={setCvc}
              keyboardType="number-pad"
              secureTextEntry
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={cvc ? styles.value : styles.placeholder}>{cvc ? '***' : '123'}</Text>
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
  placeholder: {
    color: 'lightgray',
    fontSize: 16,
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

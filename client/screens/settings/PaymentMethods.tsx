import { StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCardsByUserId, createCard, updateCard, deleteCard } from '@/store/cardSlice';
import { ScrollView, Text, View } from '@gluestack-ui/themed';

export default function PaymentMethods() {
  // const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cards = useSelector((state: RootState) => state.card.cards);
  const card = cards.length > 0 ? cards[0] : null;
  const [isEditing, setIsEditing] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvcValue, setCvc] = useState('');

  const resetCardState = () => {
    setCardholderName('');
    setCardNumber('');
    setExpiryDate('');
    setCvc('');
  };
  // fetch the cards details from cards table using userId
  useEffect(() => {
    if (user?.id) {
      dispatch(getCardsByUserId(user.id));
    } else {
      // Reset local state if no user is logged in
      resetCardState();
    }
  }, [user]);

  useEffect(() => {
    if (cards.length > 0) {
      const card = cards[0];
      setCardholderName(card.cardholder_name);
      setCardNumber(card.card_number);
      setExpiryDate(card.expiry_date);
      setCvc(card.cvc);
    } else {
      // Reset local state if no cards exist
      resetCardState();
    }
  }, [cards]);

  const handleSavePaymentMethod = () => {
    // console.log('Saving payment method...');
    if (!cardNumber || !expiryDate || !cvcValue || !cardholderName) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }
    const cardDto = {
      user: user.id,
      cardholder_name: cardholderName,
      card_number: cardNumber,
      expiry_date: expiryDate,
      cvc: cvcValue,
    };
    // console.log('Card DTO:', cardDto);
    if (card?.id) {
      // Update existing card
      dispatch(updateCard({ id: card.id, cardDto }))
        .unwrap()
        .then((result) => {
          // console.log('Card updated successfully:', result);
          Alert.alert('Success', 'Your payment method was updated!', [
            {
              text: 'OK',
              onPress: () => setIsEditing(false),
            },
          ]);
          setCardholderName(cardDto.cardholder_name);
          setCardNumber(cardDto.card_number);
          setExpiryDate(cardDto.expiry_date);
          setCvc(cardDto.cvc);
        })
        .catch((error) => {
          console.error('Error updating card:', error);
          Alert.alert('Error', error.message || 'Failed to update payment method.');
        });
    } else {
      // Create new card
      dispatch(createCard(cardDto))
        .unwrap()
        .then((result) => {
          // console.log('Card created successfully:', result);
          Alert.alert('Success', 'Your payment method was added!', [
            {
              text: 'OK',
              onPress: () => setIsEditing(false),
            },
          ]);
          setCardholderName(cardDto.cardholder_name);
          setCardNumber(cardDto.card_number);
          setExpiryDate(cardDto.expiry_date);
          setCvc(cardDto.cvc);
        })
        .catch((error) => {
          console.error('Error creating card:', error);
          Alert.alert('Error', error.message || 'Failed to add payment method.');
        });
    }
  };

  const handleDeleteCard = () => {
    if (!card?.id) return;

    Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteCard(card.id))
            .unwrap()
            .then(() => {
              Alert.alert('Success', 'Card deleted successfully!');
              // Reset local state
              resetCardState();
              // Refresh Redux state
              dispatch(getCardsByUserId(user.id));
            })
            .catch((error) => {
              console.error('Error deleting card:', error);
              Alert.alert('Error', error.message || 'Failed to delete card.');
            });
        },
      },
    ]);
  };
  return (
    <ScrollView style={styles.container}>
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
              value={cvcValue}
              onChangeText={setCvc}
              keyboardType="number-pad"
              secureTextEntry
              style={styles.inputField}
            />
          </Input>
        ) : (
          <Text style={cvcValue ? styles.value : styles.placeholder}>
            {cvcValue ? '***' : '123'}
          </Text>
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
                onPress={handleSavePaymentMethod}
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
              <Text style={styles.saveText}>
                {cards.length > 0 ? 'Edit Card Details' : 'Add Card Details'}
              </Text>
            </Button>
          </View>
        )}
      </View>
      {cards.length > 0 && (
        <View style={styles.button}>
          <Button
            size="xl"
            variant="solid"
            action="negative"
            onPress={handleDeleteCard}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Delete Card</Text>
          </Button>
        </View>
      )}
    </ScrollView>
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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
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
    paddingBottom: 10,
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
    height: 50,
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { updateUserById } from '../auth/userSlice';
import { UpdateUserDto } from '../auth/users/updateuserDto';

export default function MembershipSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const handleSwitchRole = () => {
    const updatedUser: UpdateUserDto = {
      role: user?.role === "business" ? "private" : "business"
    };
    
    // console.log('Dispatching updateUserById with:', { userId: user.id, userData: updatedUser });
    dispatch(updateUserById({ userId: user!.id, userData: updatedUser }))
      .unwrap()
      .then(() => {
        // console.log('Inside then block after updateUserById', updatedUser, user.id);
        Alert.alert('Profile updated successfully!', 'Profile updated successfully!', [
          {
            text: 'OK',
          },
        ]);
      })
      .catch((error) => {
        console.error('Error updating profile handlleSave:', error);
        Alert.alert('Error', error || 'Failed to update profile.');
      });
  };

  //TODO fix in the backend 'property role should not exists'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MembershipSettings</Text>

      {user && user.role && (
        <Button
          title={
            user.role === 'business' ? 'Switch to Private' : 'Switch to Business'
          }
          onPress={handleSwitchRole}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
});

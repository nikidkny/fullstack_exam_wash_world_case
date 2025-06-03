import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Alert } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserById, logout, updateUserById } from '../auth/userSlice';

export default function PersonalInfo() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  // destructure user data
  const { email, first_name, last_name, address, phone_number } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedFirstName, setEditedFirstName] = useState(first_name);
  const [editedLastName, setEditedLastName] = useState(last_name);
  // const [editedAddress, setEditedAddress] = useState(address);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phone_number.toString());

  useEffect(() => {
    // console.log('useEffect triggered');
    if (user) {
      // console.log('UseEffect in PersonalInfo:', user);
      setEditedEmail(user.email);
      setEditedFirstName(user.first_name);
      setEditedLastName(user.last_name);
      setEditedPhoneNumber(user.phone_number.toString());
    }
  }, [user]);

  // Update profile logic
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // only if the user has changed the data
    if (
      editedEmail === email &&
      editedFirstName === first_name &&
      editedLastName === last_name &&
      editedPhoneNumber === phone_number.toString()
    ) {
      Alert.alert('No changes made', 'You have not made any changes to your profile.');
      return;
    }

    const updatedUser: UpdateUserDto = {
      first_name: editedFirstName,
      last_name: editedLastName,
      email: editedEmail,
      phone_number: parseInt(editedPhoneNumber, 10),
    };
    // console.log('Dispatching updateUserById with:', { userId: user.id, userData: updatedUser });
    dispatch(updateUserById({ userId: user.id, userData: updatedUser }))
      .unwrap()
      .then(() => {
        // console.log('Inside then block after updateUserById', updatedUser, user.id);
        Alert.alert('Profile updated successfully!', 'Profile updated successfully!', [
          {
            text: 'OK',
            onPress: () => setIsEditing(false),
          },
        ]);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating profile handlleSave:', error);
        Alert.alert('Error', error || 'Failed to update profile.');
      });
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(deleteUserById(user.id)).unwrap();
            Alert.alert('Success', 'Account deleted successfully!');
            dispatch(logout()); // Navigate to login screen after deletting the profile
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth', state: { routes: [{ name: 'LoginScreen' }] } }],
            });
          } catch (error) {
            Alert.alert('Error', error || 'Failed to delete account.');
          }
        },
      },
    ]);
  };

  return (
    <View>
      {/* Edit email section */}
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={[styles.input]} onChangeText={setEditedEmail}>
            <InputField
              placeholder="example@example.com"
              value={editedEmail}
              onChangeText={setEditedEmail}
              keyboardType="default"
              autoCapitalize="none"
              style={styles.inputField}
            />
          </Input>
        ) : email ? (
          <Text style={styles.value}>{email}</Text>
        ) : (
          <Text style={styles.placeholder}>example@example.com</Text>
        )}
      </View>
      {/* Edit First Name section*/}
      <View style={styles.section}>
        <Text style={styles.label}>First Name</Text>
        {isEditing ? (
          <Input
            variant="outline"
            size="xl"
            style={[styles.input]}
            onChangeText={setEditedFirstName}
          >
            <InputField
              placeholder="John"
              value={editedFirstName}
              onChangeText={setEditedFirstName}
              keyboardType="default"
              autoCapitalize="words"
              style={styles.inputField}
            />
          </Input>
        ) : first_name ? (
          <Text style={styles.value}>{first_name}</Text>
        ) : (
          <Text style={styles.placeholder}>First Name</Text>
        )}
      </View>
      {/* Edit Last Name section */}
      <View style={styles.section}>
        <Text style={styles.label}>Last Name</Text>
        {isEditing ? (
          <Input
            variant="outline"
            size="xl"
            style={[styles.input]}
            onChangeText={setEditedLastName}
          >
            <InputField
              placeholder="Doe"
              value={editedLastName}
              onChangeText={setEditedLastName}
              keyboardType="default"
              autoCapitalize="words"
              style={styles.inputField}
            />
          </Input>
        ) : last_name ? (
          <Text style={styles.value}>{last_name}</Text>
        ) : (
          <Text style={styles.placeholder}>Last Name</Text>
        )}
      </View>
      {/* Edit Address section*/}
      {/* <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={[styles.input]}>
            <InputField
              placeholder="Example Street 123, 1. th., 1000 Copenhagen K"
              value={editedAddress}
              onChangeText={setEditedAddress}
              keyboardType="default"
              autoCapitalize="none"
              style={styles.inputField}
            />
          </Input>
        ) : address ? (
          <Text style={styles.value}>{address}</Text>
        ) : (
          <Text style={styles.placeholder}>Address</Text>
        )}
      </View> */}
      {/* Edit Phone Number section */}
      <View style={styles.section}>
        <Text style={styles.label}>Phone Number</Text>
        {isEditing ? (
          <Input variant="outline" size="xl" style={[styles.input]}>
            <InputField
              placeholder="+45 1234 5678"
              value={editedPhoneNumber}
              onChangeText={setEditedPhoneNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
              style={styles.inputField}
            />
          </Input>
        ) : phone_number ? (
          <Text style={styles.value}>{phone_number}</Text>
        ) : (
          <Text style={styles.placeholder}>+45 1234 5678</Text>
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
                accessibilityLabel="Cancel Editing Button"
                onPress={() => setIsEditing(false)}
                style={{
                  paddingVertical: 14,
                  borderRadius: 8,
                  height: 50,
                  backgroundColor: '#F7F7F7',
                  borderColor: '#666666',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Cancel</Text>
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                size="xl"
                variant="solid"
                action="primary"
                accessibilityLabel="Save Changes Button"
                onPress={handleSave}
                style={{
                  paddingVertical: 14,
                  borderRadius: 8,
                  height: 50,
                  backgroundColor: '#06C167',
                  borderColor: '#06C167',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Save changes</Text>
              </Button>
            </View>
          </>
        ) : (
          <View style={styles.button}>
            <Button
              size="xl"
              variant="solid"
              action="primary"
              accessibilityLabel="Edit Profile Button"
              onPress={handleEdit}
              style={{
                paddingVertical: 14,
                borderRadius: 8,
                height: 50,
                backgroundColor: '#06C167',
                borderColor: '#06C167',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
              onPress={() => setIsEditing(true)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit Profile</Text>
            </Button>
          </View>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          size="xl"
          variant="solid"
          action="primary"
          accessibilityLabel="Delete Profile Button"
          onPress={handleDeleteAccount}
          style={{
            paddingVertical: 14,
            borderRadius: 8,
            height: 50,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Delete Account
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: 'gray',
  },
  value: {
    fontSize: 16,
  },
  placeholder: {
    color: 'lightgray',
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
});

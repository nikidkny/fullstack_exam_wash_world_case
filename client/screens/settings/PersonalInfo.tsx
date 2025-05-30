import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';

export default function PersonalInfo() {
  const route = useRoute();
  const { user } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedFirstName, setEditedFirstName] = useState(user.firstName);
  const [editedLastName, setEditedLastName] = useState(user.lastName);
  // const [editedName, setEditedName] = useState(`${user.firstName} ${user.lastName}`);
  const [editedAddress, setEditedAddress] = useState(user.address);

  // Update profile logic
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      firstName: editedFirstName,
      lastName: editedLastName,
      email: editedEmail,
      address: editedAddress,
    }));
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted!') },
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
        ) : (
          <Text style={styles.value}>{user.email}</Text>
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
        ) : (
          <Text style={styles.value}>{user.firstName}</Text>
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
        ) : (
          <Text style={styles.value}>{user.lastName}</Text>
        )}
      </View>
      {/* Edit Address section*/}
      <View style={styles.section}>
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
        ) : (
          <Text style={styles.value}>{user.address}</Text>
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

import { Text, ScrollView, View } from '@gluestack-ui/themed';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { SettingRow } from '@/components/ui/settings-row';
import {
  UserIcon,
  CreditCardIcon,
  ShieldIcon,
  BellIcon,
  GlobeIcon,
  FileTextIcon,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigationType';
import { useQuery } from '@tanstack/react-query';

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user.user);

  // Fetch all users if the logged-in user is an admin
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await res.json();
      return json.data;
    },
    enabled: user?.role === 'admin', // Only fetch if the user is an admin
  });

  return (
    <ScrollView>
      <Text style={styles.heading}>Hey {user?.first_name}!</Text>
      <SettingRow
        label="Personal Information"
        icon={<UserIcon size={20} color="black" />}
        onPress={() => navigation.navigate('PersonalInfo')}
      />
      <SettingRow
        label="Payment Methods"
        icon={<CreditCardIcon size={20} color="black" />}
        onPress={() => navigation.navigate('PaymentMethods')}
      />
      <SettingRow
        label="Membership Settings"
        icon={<CreditCardIcon size={20} color="black" />}
        onPress={() => navigation.navigate('MembershipSettings', { user })}
      />
      <SettingRow
        label="Wash History"
        icon={<FileTextIcon size={20} color="black" />}
        onPress={() => navigation.navigate('WashHistory', { user })}
      />
      <SettingRow
        label="Billing History"
        icon={<ShieldIcon size={20} color="black" />}
        onPress={() => navigation.navigate('BillingHistory', { user })}
      />
      {/* Admin-specific feature */}
      {user?.role === 'admin' && (
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 16 }}>All Users:</Text>
          {isLoading && <Text>Loading...</Text>}
          {error && <Text>Error loading users</Text>}
          {users &&
            users.map((user) => (
              <View key={user.id} style={{ marginBottom: 12 }}>
                <Text>
                  Name: {user.first_name} {user.last_name}
                </Text>
                <Text>Email: {user.email}</Text>
                <Text>Role: {user.role}</Text>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});

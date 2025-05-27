import { Text, ScrollView } from '@gluestack-ui/themed';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { fetchUserById } from '@/store/userSlice';
import { RootState } from '@/store/store';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const userData = useSelector((state: RootState) => state.user.data);
  // const [user, setUser] = useState({
  //   firstName: 'Testing',
  //   lastName: 'Person',
  //   email: 'testperson@gmail.com',
  //   address: '1234 Test Street, Springfield',
  // });
  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchUserById(user.userId));
    }
  }, [dispatch, user?.userId]);
  console.log('user', user);
  return (
    <ScrollView>
      <Text style={styles.heading}>Hey {user.firstName}!</Text>
      <SettingRow
        label="Personal Information"
        icon={<UserIcon size={20} color="black" />}
        onPress={() => navigation.navigate('PersonalInfo', { user })}
      />
      <SettingRow
        label="Payment Methods"
        icon={<CreditCardIcon size={20} color="black" />}
        onPress={() => navigation.navigate('PaymentMethods', { user })}
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

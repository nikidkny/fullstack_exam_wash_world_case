import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { updateUserById } from '../auth/userSlice';
import { UpdateUserDto } from '../auth/users/updateuserDto';
import { useMembershipPlans } from '../auth/membershipPlans/useMembershipPlans';
import { Dropdown } from 'react-native-element-dropdown';

export default function MembershipSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [membershipPlanId, setMembershipPlanId] = useState(0);
  const { membershipPlans } = useMembershipPlans();
  const [showDropdown, setShowDropdown] = useState(false);
  const currentMembershipName = (user as any)?.licensePlateMembershipPlans?.[0]?.membershipPlan?.name ?? null;

  useEffect(() => {
    console.log(currentMembershipName);
    console.log((user as any)?.licensePlateMembershipPlans?.[0]?.membershipPlan?.name);
    console.log((user as any)?.role);
  }, []);

  const handleUpdateMembership = () => {
    if (!membershipPlanId) {
      Alert.alert('Error', 'Please select a membership plan.');
      return;
    }

    const updatedUser: UpdateUserDto = {
      membership_plan_id: membershipPlanId,
    };


    dispatch(updateUserById({ userId: user!.id, userData: updatedUser }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Membership updated successfully!');
        setShowDropdown(false);
      })
      .catch((error) => {
        console.error('Error updating membership:', error);
        Alert.alert('Error', error || 'Failed to update membership.');
      });
  };

  const filteredPlans = membershipPlans?.filter((plan) =>
    user?.role === 'business' ? !plan.is_business : plan.is_business
  ) || [];



  return (
    <View style={styles.container}>

      {currentMembershipName && (
        <Text >
          Current Membership: {currentMembershipName}
        </Text>
      )}

      {user && user.role && !showDropdown && (
        <Button
          size="lg"
          variant="outline"
          action="primary"
          onPress={() => setShowDropdown(true)}
        >
          <Text>
            {user.role === 'business' ? 'Switch to Private' : 'Switch to Business'}
          </Text>
        </Button>
      )}

      {showDropdown && (
        <>
          <Text style={styles.label}>Choose a membership plan:</Text>
          <Dropdown
            data={filteredPlans!.map((plan) => ({
              label: plan.name,
              value: plan.id.toString(),
            }))}
            labelField="label"
            valueField="value"
            placeholder="Select option"
            value={membershipPlanId?.toString()}
            onChange={(item) => setMembershipPlanId(Number(item.value))}
            style={styles.dropdown}
          />

          <Button
            size="lg"
            variant="outline"
            action="primary"
            onPress={handleUpdateMembership}
          >
            <Text>Update Membership</Text>
          </Button>
        </>
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
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  dropdown: {
    marginBottom: 16,
  },
});

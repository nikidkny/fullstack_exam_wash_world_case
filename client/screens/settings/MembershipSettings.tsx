import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function MembershipSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <View>
      <Text>MembershipSettings</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

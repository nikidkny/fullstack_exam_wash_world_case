import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

export default function MembershipSettings() {
  const route = useRoute();
  const { user } = route.params;
  return (
    <View>
      <Text>MembershipSettings</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

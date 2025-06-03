import React, { useEffect } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import NavigationBar from '@/components/ui/NavigationBar';
import LocationCard from '@/components/ui/LocationCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { fetchLocations } from '@/locations/locationsSlice';
import { LocationEntity } from '@/locations/locationEntity';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '@/store/store';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '@/navigationType';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations.locations);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);
  // console.log('locations!!', locations);
  console.log('user1', user);

  // Render a single location card item
  const renderItem = ({ item }: { item: LocationEntity }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('WashFlowScreen', { locationId: item.id, locationName: item.name })
      }
    >
      <LocationCard
        name={item.name}
        address={item.address}
        open_hours={item.open_hours}
        has_self_wash={item.has_self_wash}
      />
    </TouchableOpacity>
  );

  return (
    <Box flex={1} bg="$white">
      <View style={styles.container}>
        <Text style={styles.text}>Welcome {user?.first_name}</Text>
      </View>
      <NavigationBar />
      {locations && locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id?.toString() ?? ''}
          contentContainerStyle={{ paddingTop: 80, paddingHorizontal: 16 }}
          ListHeaderComponent={
            <Text fontSize="$xl" color="$black" fontWeight="$bold" mb="$4">
              Your Destinations
            </Text>
          }
          renderItem={renderItem}
        />
      )}
    </Box>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

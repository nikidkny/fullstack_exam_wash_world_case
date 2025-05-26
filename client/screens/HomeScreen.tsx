import React, { useEffect } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import NavigationBar from "@/components/ui/NavigationBar";
import LocationCard from "@/components/ui/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchLocations } from "@/locations/locationsSlice";
import { LocationEntity } from "@/locations/locationEntity";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/App";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);
  console.log("locations!!", locations);

  // Render a single location card item
  const renderItem = ({ item }: { item: LocationEntity }) => (
    <TouchableOpacity onPress={() => navigation.navigate("WashFlowScreen", { locationId: item.id, locationName: item.name })}>
      <LocationCard name={item.name} address={item.address} open_hours={item.open_hours} has_self_wash={item.has_self_wash} />
    </TouchableOpacity>
  );

  return (
    <Box flex={1} bg="$white">
      <NavigationBar />
      {locations && locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          contentContainerStyle={{ paddingTop: 64, paddingHorizontal: 16 }}
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

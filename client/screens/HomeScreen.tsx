import React, { useEffect } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import NavigationBar from "@/components/ui/NavigationBar";
import LocationCard from "@/components/ui/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchLocations } from "@/locations/locationsSlice";
import { LocationEntity } from "@/locations/locationEntity";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  // Render a single location card item
  const renderItem = ({ item }: { item: LocationEntity }) => <LocationCard name={item.name} address={item.address} open_hours={item.open_hours} has_self_wash={item.has_self_wash} />;

  return (
    <Box flex={1} bg="$white">
      <NavigationBar />
      {locations && locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          contentContainerStyle={{ paddingTop: 64, paddingHorizontal: 16 }}
          ListHeaderComponent={
            <Text fontSize="$xl" fontWeight="$bold" mb="$4">
              Your Destinations
            </Text>
          }
          renderItem={renderItem}
        />
      )}
    </Box>
  );
}

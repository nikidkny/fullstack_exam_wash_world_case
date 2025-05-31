import React, { useEffect } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import LocationCard from "@/components/ui/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchLocations } from "@/locations/locationsSlice";
import { LocationEntity } from "@/locations/locationEntity";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootState } from "@/store/store";
import { RootStackParamList } from "@/navigationType";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations.locations);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  return (
    <Box flex={1} bg="$white" px="$4" pt="$6">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Box my="$12" alignItems="center">
          <Text fontSize="$xl" fontWeight="$bold" color="$black">
            Welcome {user?.first_name ?? "Guest"}
          </Text>
        </Box>

        {locations && locations.length > 0 && (
          <>
            <Text fontSize="$xl" color="$black" fontWeight="$bold" mb="$4" ml="$1">
              Wash Locations
            </Text>

            {locations.map((item) => (
              <TouchableOpacity
                key={item.id?.toString()}
                onPress={() =>
                  navigation.navigate("WashFlowScreen", {
                    locationId: item.id,
                    locationName: item.name,
                  })
                }
              >
                <LocationCard name={item.name} address={item.address} open_hours={item.open_hours} has_self_wash={item.has_self_wash} />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </Box>
  );
}

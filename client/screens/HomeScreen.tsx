import React from "react";
import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import NavigationBar from "@/components/ui/NavigationBar";
import LocationCard from "@/components/ui/LocationCard";

export default function HomeScreen() {
  return (
    <Box flex={1} bg="$white">
      <NavigationBar />

      <ScrollView pt="$16" px="$4">
        <Text fontSize="$xl" fontWeight="$bold" mb="$4">
          Your Destinations
        </Text>

        {locations.map((location) => (
          <LocationCard name={location.name} address={location.address} open_hours={location.open_hours} has_self_wash={location.has_self_wash} />
        ))}
      </ScrollView>
    </Box>
  );
}

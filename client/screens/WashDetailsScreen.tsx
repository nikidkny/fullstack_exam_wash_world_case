import { RouteProp, useRoute } from "@react-navigation/native";
import { Box, Text } from "@gluestack-ui/themed";
import { RootStackParamList } from "@/navigationType";

type WashDetailsRouteProp = RouteProp<RootStackParamList, "WashDetailsScreen">;

export default function WashDetailsScreen() {
  const route = useRoute<WashDetailsRouteProp>();
  const { washId, washName, locationId } = route.params;

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text size="2xl" fontWeight="bold">
        {washName}
      </Text>
      <Text mt="$2">Location ID: {locationId}</Text>
      <Text mt="$2">Wash ID: {washId}</Text>
      {/* Future: Add more detailed info here */}
    </Box>
  );
}

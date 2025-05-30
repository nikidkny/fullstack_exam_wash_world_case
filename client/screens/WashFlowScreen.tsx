import { RouteProp, useRoute } from "@react-navigation/native";
import { Box, Text } from "@gluestack-ui/themed";
import { RootStackParamList } from "@/navigationType";

export default function WashFlowScreen() {
  type WashFlowRouteProp = RouteProp<RootStackParamList, "WashFlowScreen">;
  const route = useRoute<WashFlowRouteProp>();
  const { locationId } = route.params;

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Detail for location ID: {locationId}</Text>
    </Box>
  );
}

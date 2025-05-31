// import { RouteProp, useRoute } from "@react-navigation/native";
// import { Box, Text } from "@gluestack-ui/themed";
// import { RootStackParamList } from "@/navigationType";

// export default function WashFlowScreen() {
//   type WashFlowRouteProp = RouteProp<RootStackParamList, "WashFlowScreen">;
//   const route = useRoute<WashFlowRouteProp>();
//   const { locationId } = route.params;

//   return (
//     <Box flex={1} justifyContent="center" alignItems="center">
//       <Text>Detail for location ID: {locationId}</Text>
//     </Box>
//   );
// }

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Box, Text, Pressable, VStack } from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from "@/navigationType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MembershipPlanDto } from "./auth/membershipPlans/membershipPlansDto";

type WashFlowRouteProp = RouteProp<RootStackParamList, "WashFlowScreen">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WashFlowScreen() {
  const route = useRoute<WashFlowRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { locationId } = route.params;

  const {
    data: washes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["membershipPlans"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/membership-plans");
      const json = await res.json();
      return json.data;
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading plans</Text>;

  return (
    <Box p="$4" flex={1} bg="$backgroundLight0">
      <Text size="xl" fontWeight="bold" mb="$4">
        Choose Your Wash Plan
      </Text>

      <VStack space="lg">
        {washes
          .filter((wash: MembershipPlanDto) => !wash.is_business) // exclude business plans
          .map((wash: MembershipPlanDto) => (
            <Pressable
              key={wash.id}
              borderWidth={2}
              borderColor="$primary500"
              p="$5"
              rounded="$2xl"
              bg="$primary100"
              onPress={() =>
                navigation.navigate("WashDetailsScreen", {
                  washId: wash.id,
                  washName: wash.name,
                  locationId,
                })
              }
            >
              <Text size="lg" fontWeight="semibold">
                {wash.name}
              </Text>
              <Text color="$textLight500">{wash.price} DKK/month</Text>
            </Pressable>
          ))}
      </VStack>
    </Box>
  );
}

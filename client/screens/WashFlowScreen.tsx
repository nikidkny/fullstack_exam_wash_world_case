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

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Box, Text, Pressable, VStack } from '@gluestack-ui/themed';
import { useQuery } from '@tanstack/react-query';
import { RootStackParamList } from '@/navigationType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MembershipPlanDto } from './auth/membershipPlans/membershipPlansDto';
import { TouchableOpacity } from 'react-native';

type WashFlowRouteProp = RouteProp<RootStackParamList, 'WashFlowScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WashFlowScreen() {
  const route = useRoute<WashFlowRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { locationId, locationName } = route.params;

  const {
    data: washes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['membershipPlans'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/membership-plans');
      const json = await res.json();
      return json.data;
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading plans</Text>;

  return (
    <Box p="$4" flex={1} bg="$backgroundLight0">
      <Text fontSize="$xl" color="$black" fontWeight="$bold" mb="$4" ml="$1" mt="$4">
        Choose Your Wash Plan:
      </Text>
      <Text fontSize="$md" color="$textLight800" fontWeight="$normal" mb="$4" ml="$1">
        Washing at {locationName}
      </Text>

      <VStack space="lg">
        {washes
          .filter((wash: MembershipPlanDto) => !wash.is_business) // exclude business plans
          .map((wash: MembershipPlanDto) => (
            <TouchableOpacity
              key={wash.id}
              className="px-6 border rounded-xl max-w-[360px] m-3 my-2 bg-gray-100 py-10 border-gray-500"
              onPress={() =>
                navigation.navigate('WashDetailsScreen', {
                  washId: wash.id,
                  washName: wash.name,
                  locationId,
                })
              }
            >
              <Text size="lg" fontWeight="$bold">
                {wash.name}
              </Text>
              <Text color="$textLight500" fontWeight="$semibold">
                {wash.price} DKK/month
              </Text>
            </TouchableOpacity>
          ))}
      </VStack>
    </Box>
  );
}

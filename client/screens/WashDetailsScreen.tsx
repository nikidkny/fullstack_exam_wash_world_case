import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { RootStackParamList } from '@/navigationType';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type WashDetailsRouteProp = RouteProp<RootStackParamList, 'WashDetailsScreen'>;

export default function WashDetailsScreen() {
  const route = useRoute<WashDetailsRouteProp>();
  const { washId, washName, locationId } = route.params;
  const user = useSelector((state: RootState) => state.user.user);

  const handleStartWash = async () => {
    if (!user) return;
    console.log('clicked');
    //post request to backend
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <Text size="2xl" fontWeight="bold" mb="$4">
        {washName}
      </Text>

      {/* Simple clock visual (just for placeholder/visuals) */}
      <Text fontSize={64} color="$blue600">
        🕒
      </Text>

      <Button
        mt="$10"
        onPress={handleStartWash}
        isDisabled={false}
        bg="$green500"
        className="py-8 px-6"
      >
        <ButtonText className="py-8 pb-14 px-6">Start Wash!</ButtonText>
      </Button>
    </Box>
  );
}

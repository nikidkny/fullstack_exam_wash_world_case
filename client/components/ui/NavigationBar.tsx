// import React from "react";
// import { Box, HStack, Text } from "@gluestack-ui/themed";

// export default function NavigationBar() {
//   return (
//     <Box position="absolute" top={0} left={0} right={0} height={60} bg="black" px="$4" justifyContent="center" zIndex={10}>
//       <HStack alignItems="center" flex={1} className="flex justify-between">
//         {/* Logo on the left */}
//         <Text color="white" fontWeight="bold" fontSize={18}>
//           WashWorld
//         </Text>
//         <Text fontSize={16} color={"$green500"}>
//           Have problems? Contact us
//         </Text>
//       </HStack>
//     </Box>
//   );
// }

// NavigationBar.tsx
import React from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft, LogOut } from 'lucide-react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/screens/auth/userSlice';
import { AppDispatch } from '@/store/store';

export default function NavigationBar({ navigation, back, options }: StackHeaderProps) {
  const dispatch = useDispatch<AppDispatch>();

  const title = options.title ?? 'WashWorld';

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'LoginScreen' }] } }],
    });
  };

  return (
    <Box height={60} bg="black" px="$4" justifyContent="center">
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="md">
          {back && (
            <TouchableOpacity onPress={navigation.goBack}>
              <ArrowLeft color="white" size={22} />
            </TouchableOpacity>
          )}
          <Text color="white" fontWeight="bold" fontSize={18}>
            {title}
          </Text>
        </HStack>
        <HStack alignItems="center" space="md">
          <Text fontSize={14} color="$green500">
            Have problems? Contact us
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <LogOut color="white" size={22} />
          </TouchableOpacity>
        </HStack>
      </HStack>
    </Box>
  );
}

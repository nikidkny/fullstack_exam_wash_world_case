import React from "react";
import { Box, HStack, Text } from "@gluestack-ui/themed";

export default function NavigationBar() {
  return (
    <Box position="absolute" top={0} left={0} right={0} height={50} bg="black" px="$4" justifyContent="center" zIndex={10}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="white">Menu</Text>
        <Text color="white" fontWeight="bold">
          Home
        </Text>
        <Text color="$white">Profile</Text>
      </HStack>
    </Box>
  );
}

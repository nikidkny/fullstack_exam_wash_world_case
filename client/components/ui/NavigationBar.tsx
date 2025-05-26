import React from "react";
import { Box, HStack, Text } from "@gluestack-ui/themed";

export default function NavigationBar() {
  return (
    <Box position="absolute" top={0} left={0} right={0} height={60} bg="black" px="$4" justifyContent="center" zIndex={10}>
      <HStack alignItems="center" flex={1} className="flex justify-between">
        {/* Logo on the left */}
        <Text color="white" fontWeight="bold" fontSize={18}>
          WashWorld
        </Text>
        <Text fontSize={16} color={"$green500"}>
          Have problems? Contact us
        </Text>
      </HStack>
    </Box>
  );
}

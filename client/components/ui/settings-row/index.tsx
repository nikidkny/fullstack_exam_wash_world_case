'use client';
import { Pressable, HStack, Text, Icon } from '@gluestack-ui/themed';
import { ChevronRightIcon } from 'lucide-react-native'; // can use any icon lib
import { ReactNode } from 'react';

interface SettingRowProps {
  label: string;
  icon: ReactNode;
  onPress?: () => void;
}

export function SettingRow({ label, icon, onPress }: SettingRowProps) {
  return (
    <Pressable onPress={onPress}>
      <HStack
        display="flex"
        flexDirection="row"
        padding={20}
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        width="100%"
      >
        <HStack display="flex" flexDirection="row" gap={16} alignItems="center">
          {icon}
          <Text style={{ fontSize: 20 }}>{label}</Text>
        </HStack>
        <Icon as={ChevronRightIcon} />
      </HStack>
    </Pressable>
  );
}

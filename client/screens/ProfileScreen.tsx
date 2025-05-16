import { Text, Box } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <Box style={{ marginTop: 30 }} className="flex gap-10 items-center bg-orange-100 w-screen">
      <Text>Hello from Gluestack!</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

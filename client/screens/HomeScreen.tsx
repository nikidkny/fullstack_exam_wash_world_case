import { RootState } from '@/store/store';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen() {

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user?.firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

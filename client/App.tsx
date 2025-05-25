import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet } from 'react-native';
import { RootState, store } from './store/store';
import * as SecureStore from 'expo-secure-store';
import { Provider, useDispatch, useSelector } from 'react-redux';
// Navigation components
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/auth/AuthScreen';
import PersonalInfo from './screens/settings/PersonalInfo';
import PaymentMethods from './screens/settings/PaymentMethods';
import MembershipSettings from './screens/settings/MembershipSettings';
import WashHistory from './screens/settings/WashHistory';
import BillingHistory from './screens/settings/BillingHistory';
// React Query for server state management
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';
import { useEffect } from 'react';
import { RootStackParamList } from './navigationType';
import { reloadJwtFromStorage } from './screens/auth/authSlice';
import { config } from '@gluestack-ui/config';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

/**
 * Bottom tab navigator shown to authenticated users.
 * Includes Home and Profile tabs.
 */
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerRight: () => (
            // Replace this with dispatch(logout()) when auth is implemented
            <Button title="Logout" onPress={() => console.log('Log out')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/** Stack navigation*/
export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{ headerTitle: 'Edit Personal Information' }}
      />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
      <Stack.Screen name="MembershipSettings" component={MembershipSettings} />
      <Stack.Screen name="WashHistory" component={WashHistory} />
      <Stack.Screen name="BillingHistory" component={BillingHistory} />
    </Stack.Navigator>
  );
}

/**
 * MainApp decides whether to show the Auth screens or the main app tabs,
 * depending on whether the user is authenticated.
 */
function MainApp() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    async function getToken() {
      const storedToken = await SecureStore.getItemAsync('jwt');

      if (storedToken) {
        dispatch(reloadJwtFromStorage(storedToken));
      }
    }
    getToken();
  }, [dispatch]);
  return <NavigationContainer>{token ? <TabNavigator /> : <AuthScreen />}</NavigationContainer>;
}

/**
 * Root component of the app. Wraps everything in Redux, Query
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <NavigationContainer>
            <TabNavigator />
            {/* <MainApp />*/}
          </NavigationContainer>
          <StatusBar style="auto" />
        </Provider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

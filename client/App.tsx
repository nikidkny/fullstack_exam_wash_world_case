import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet } from 'react-native';
import { AppDispatch, RootState, store } from './store/store';
import * as SecureStore from 'expo-secure-store';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Navigation components
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import PersonalInfo from './screens/settings/PersonalInfo';
import PaymentMethods from './screens/settings/PaymentMethods';
import MembershipSettings from './screens/settings/MembershipSettings';
import WashHistory from './screens/settings/WashHistory';
import BillingHistory from './screens/settings/BillingHistory';

// React Query for server state management
import WashFlowScreen from './screens/WashFlowScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';
import { useEffect } from 'react';
import { RootStackParamList } from './navigationType';
import { logout, reloadJwtFromStorage } from './screens/auth/authSlice';
import Toast from 'react-native-toast-message';
import './global.css';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Create a QueryClient instance for React Query

// export type RootStackParamList = {
//   Home: undefined;
//   WashFlowScreen: { locationId: number; locationName: string };
// };

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Homepage"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="WashFlowScreen"
      component={WashFlowScreen}
      options={({ route }) => ({
        title: `${route.params?.locationName ?? 'Unknown'}`,
      })}
    />
  </Stack.Navigator>
);
/**
 * Bottom tab navigator shown to authenticated users.
 * Includes Home and Profile tabs.
 */
function TabNavigator() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerRight: () => (
            // Replace this with dispatch(logout()) when auth is implemented

            <Button title="Logout" onPress={() => dispatch(logout())} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/** Stack navigation*/

export function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{ headerTitle: 'Edit Personal Information' }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{ headerTitle: 'Edit Payment Methods' }}
      />
      <Stack.Screen
        name="MembershipSettings"
        component={MembershipSettings}
        options={{ headerTitle: 'Edit Membership Details' }}
      />
      <Stack.Screen
        name="WashHistory"
        component={WashHistory}
        options={{ headerTitle: 'See Wash History' }}
      />
      <Stack.Screen
        name="BillingHistory"
        component={BillingHistory}
        options={{ headerTitle: 'See Billing History' }}
      />
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

      await ensureMembershipPlansExist();
      // await ensureLocationExist();
    }
    getToken();
  }, [dispatch]);

  async function ensureMembershipPlansExist() {
    try {
      const checkResponse = await fetch('http://localhost:3000/membership-plans', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!checkResponse.ok) throw new Error('Failed to check membership plans');

      const { data } = await checkResponse.json();

      if (data.length > 0) {
        return;
      }

      const seedResponse = await fetch('http://localhost:3000/membership-plans/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!seedResponse.ok) throw new Error('Failed to seed membership plans');

      console.log('Membership plans seeded');
    } catch (error: any) {
      console.error('Error while checking/seeding:', error.message);
    }
  }

  async function ensureLocationExist() {
    try {
      const checkResponse = await fetch('http://localhost:3000/locations/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!checkResponse.ok) throw new Error('Failed to check locations');

      const { data } = await checkResponse.json();

      if (data.length > 0) {
        return;
      }

      const seedResponse = await fetch('http://localhost:3000/locations/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!seedResponse.ok) throw new Error('Failed to seed locations plans');

      console.log(' locations  seeded');
    } catch (error: any) {
      console.error('Error while checking/seeding:', error.message);
    }
  }

  return <NavigationContainer>{token ? <TabNavigator /> : <AuthNavigator />}</NavigationContainer>;
}

/**
 * Root component of the app. Wraps everything in Redux, Query
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <Toast />
          <MainApp />
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

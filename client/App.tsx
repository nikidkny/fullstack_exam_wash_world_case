import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import { AppDispatch, RootState, store } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { Provider, useDispatch, useSelector } from "react-redux";

// Navigation components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Screens
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";

// React Query for server state management
import WashFlowScreen from "./screens/WashFlowScreen";
import PersonalInfo from "./screens/settings/PersonalInfo";
import PaymentMethods from "./screens/settings/PaymentMethods";
import MembershipSettings from "./screens/settings/MembershipSettings";
import WashHistory from "./screens/settings/WashHistory";
import BillingHistory from "./screens/settings/BillingHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect } from "react";
import { RootStackParamList } from "./navigationType";
import { logout, reloadJwtFromStorage } from "./screens/auth/authSlice";
import Toast from "react-native-toast-message";
import "./global.css";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import WashDetailsScreen from "./screens/WashDetailsScreen";
import NavigationBar from "./components/ui/NavigationBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

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
  <Stack.Navigator
    screenOptions={{
      header: (props) => <NavigationBar {...props} />,
    }}
  >
    <Stack.Screen name="Homepage" component={HomeScreen} />
    <Stack.Screen name="WashFlowScreen" component={WashFlowScreen} />
    <Stack.Screen name="WashDetailsScreen" component={WashDetailsScreen} />
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
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

/** Stack navigation*/
export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <NavigationBar {...props} />,
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerTitle: "Edit Personal Information" }} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ headerTitle: "Edit Payment Methods" }} />
      <Stack.Screen name="MembershipSettings" component={MembershipSettings} options={{ headerTitle: "Edit Membership Details" }} />
      <Stack.Screen name="WashHistory" component={WashHistory} options={{ headerTitle: "See Wash History" }} />
      <Stack.Screen name="BillingHistory" component={BillingHistory} options={{ headerTitle: "See Billing History" }} />
    </Stack.Navigator>
  );
}

/**
 * MainApp decides whether to show the Auth screens or the main app tabs,
 * depending on whether the user is authenticated.
 */
function MainApp() {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function getToken() {
      const storedToken = await SecureStore.getItemAsync("jwt");

      if (storedToken && user) {
        dispatch(reloadJwtFromStorage(storedToken));
      } else {
        dispatch(logout());
      }

      await ensureMembershipPlansExist();
      // await ensureLocationExist();
    }
    getToken();
  }, [dispatch]);

  async function ensureMembershipPlansExist() {
    try {
      const checkResponse = await fetch("http://localhost:3000/membership-plans", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!checkResponse.ok) throw new Error("Failed to check membership plans");

      const { data } = await checkResponse.json();

      if (data.length > 0) {
        return;
      }

      const seedResponse = await fetch("http://localhost:3000/membership-plans/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!seedResponse.ok) throw new Error("Failed to seed membership plans");

      console.log("Membership plans seeded");
    } catch (error: any) {
      console.error("Error while checking/seeding:", error.message);
    }
  }

  async function ensureLocationExist() {
    try {
      const checkResponse = await fetch("http://localhost:3000/locations/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!checkResponse.ok) throw new Error("Failed to check locations");

      const { data } = await checkResponse.json();

      if (data.length > 0) {
        return;
      }

      const seedResponse = await fetch("http://localhost:3000/locations/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!seedResponse.ok) throw new Error("Failed to seed locations plans");

      console.log(" locations  seeded");
    } catch (error: any) {
      console.error("Error while checking/seeding:", error.message);
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

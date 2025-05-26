import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import { RootState, store } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { reloadJwtFromStorage } from "./screens/auth/userSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
// Navigation components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// Screens
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
// React Query for server state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RootStackParamList } from "./navigationType";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import "./global.css";

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator();
// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

/**
 * Stack navigator for unauthenticated users.
 * Includes Login and Signup screens.
 */
function AuthScreens() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

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
        component={ProfileScreen}
        options={{
          headerRight: () => (
            // Replace this with dispatch(logout()) when auth is implemented
            <Button title="Logout" onPress={() => console.log("Log out")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * MainApp decides whether to show the Auth screens or the main app tabs,
 * depending on whether the user is authenticated.
 */
function MainApp() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    async function getToken() {
      const storedToken = await SecureStore.getItemAsync("jwt");

      if (storedToken) {
        dispatch(reloadJwtFromStorage(storedToken));
      }
    }
    getToken();
  }, [dispatch]);
  //delete ! from token to see login/signup
  return <NavigationContainer>{!token ? <TabNavigator /> : <AuthScreens />}</NavigationContainer>;
}

/**
 * Root component of the app. Wraps everything in Redux, Query
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
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

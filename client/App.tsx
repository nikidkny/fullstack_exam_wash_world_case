import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import { store } from "./store/store";
import { Provider } from "react-redux";
// Navigation components
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
// React Query for server state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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
          )
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
  const token = "d"; // TODO: Replace with logic to check for a real JWT/token

  return (
    <NavigationContainer>
      {token ? <TabNavigator /> : <AuthScreens />}
    </NavigationContainer>
  );
}

/**
 * Root component of the app. Wraps everything in Redux, Query
 */
export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainApp />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </Provider>
  );
}

// Basic reusable styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
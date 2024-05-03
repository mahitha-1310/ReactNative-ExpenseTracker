import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";
import Header from "./components/Header";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { UserProvider } from "./store/UserContext";
import FinancialDataScreen from "./screens/FinancialDataScreen";
import AddData from "./components/AddData";

import MonthNavigator from "./components/MonthNavigator";
import AnalysisScreen from "./screens/AnalysisScreen";
import MonthlySummary from "./components/MonthlySummary";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="FinancialDataScreen"
      activeColor="#cab8d9"
      // activeColor="#702632"
      inactiveColor="#FAEEEA"
      barStyle={{ backgroundColor: "#702632" }}
    >
      <Tab.Screen
        name="FinancialDataScreen"
        component={FinancialDataScreen}
        options={{
          tabBarLabel: "RECORDS",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={AnalysisScreen}
        options={{
          tabBarLabel: "ANALYSIS",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <MonthNavigator />
      <MonthlySummary />
      <TabNavigator />
      {/* <AddTask /> */}
      <AddData />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

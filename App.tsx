import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TasksScreen from "./screens/TasksScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { UserProvider } from "./store/UserContext";
import FinancialDataScreen from "./screens/FinancialDataScreen";
import AddData from "./components/AddData";
import { StateProvider } from "./store/StateContext";


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="FinancialDataScreen"
      activeColor="#cd5b45"
      inactiveColor="#FAEEEC"
      barStyle={{ backgroundColor: "#cd5b45" }}
    >
      <Tab.Screen
        name="FinancialDataScreen"
        component={FinancialDataScreen}
        options={{
          tabBarLabel: "TASKS",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "FAVORITES",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="star" color={color} size={26} />
          ),
        }}
      /> */}
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
      <TabNavigator />
      {/* <AddTask /> */}
      <AddData/>
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

const styles = StyleSheet.create({
  text: {
    color: "#FAEEEC",
  },
  container: {
    flex: 1,
  },
});

export default App;

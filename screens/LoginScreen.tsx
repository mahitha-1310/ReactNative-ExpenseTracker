import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  Image,
} from "react-native";

import { useData } from "../store/UserContext";

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onLogin } = useData();

  const handleLogin = () => {
    if (!id.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }
    onLogin(id.trim(), password.trim(), navigation, loginSuccess);
  };

  const loginSuccess = () => {
    setId("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/login.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.heading}>LOGIN</Text>
      <TextInput
        placeholder="Username"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </Pressable>
      <Pressable
        testID="Register"
        onPress={() => navigation.navigate("Register")}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFA",
  },
  input: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#702632",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  heading: {
    color: "#702632",
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#702632",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFA",
    fontWeight: "bold",
  },
  secondaryButton: {
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#702632",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginScreen;

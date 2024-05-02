import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
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
      <Text style={styles.heading}>LOGIN HERE</Text>
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
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
      <Pressable
        testID="Register"
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>DON'T HAVE AN ACCOUNT? REGISTER</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080705",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
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
});

export default LoginScreen;

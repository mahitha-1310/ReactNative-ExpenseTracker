import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";
import { useTask } from "../store/StateContext";
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
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={[styles.container, styles.overlay]}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  heading: {
    marginTop: 50,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    color: "white",
    padding: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#cd5b45",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;
